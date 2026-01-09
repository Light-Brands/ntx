/**
 * TRANSACTION VERIFICATION SERVICE
 * =================================
 * Out-of-band verification for crypto transactions.
 * 
 * This service ensures that ONLY humans can authorize transactions by:
 * 1. Sending a PIN via SMS or email (channels Mira cannot access)
 * 2. Validating the PIN and issuing a single-use verification token
 * 3. Binding the token to specific transaction parameters that cannot be changed
 * 
 * The verification flow:
 * 1. User initiates transaction in UI
 * 2. UI calls requestVerification() → PIN sent to user's phone/email
 * 3. User enters PIN in UI
 * 4. UI calls validatePin() → receives verification token
 * 5. UI calls CryptoExecutionService with token → transaction executes
 * 
 * Mira CANNOT:
 * - Request verification (doesn't have user's phone/email context)
 * - Receive the PIN (sent out-of-band)
 * - Generate tokens (only this service can)
 * - Execute transactions (requires token from this service)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import type {
  TransactionType,
  VerificationMethod,
  LockedTransactionParams,
  TransactionVerificationToken,
  VerificationRequest,
  VerificationInitResponse,
  PinValidationRequest,
  PinValidationResponse,
  RiskTierConfig,
} from '../types';
import {
  VerificationError,
  VERIFICATION_TIERS,
  VERIFICATION_CONFIG,
} from '../types/verification';

// ============================================================================
// TYPES
// ============================================================================

interface SMSProvider {
  sendSMS(phoneNumber: string, message: string): Promise<boolean>;
}

interface EmailProvider {
  sendEmail(email: string, subject: string, body: string): Promise<boolean>;
}

// ============================================================================
// SERVICE IMPLEMENTATION
// ============================================================================

export class TransactionVerificationService {
  private smsProvider: SMSProvider | null = null;
  private emailProvider: EmailProvider | null = null;

  constructor(private supabase: SupabaseClient) {}

  /**
   * Configure SMS provider (e.g., Twilio)
   */
  setSMSProvider(provider: SMSProvider): void {
    this.smsProvider = provider;
  }

  /**
   * Configure email provider
   */
  setEmailProvider(provider: EmailProvider): void {
    this.emailProvider = provider;
  }

  // ==========================================================================
  // REQUEST VERIFICATION
  // ==========================================================================

  /**
   * Initiate verification for a transaction.
   * Sends PIN via SMS or email based on user preference and risk tier.
   */
  async requestVerification(
    request: VerificationRequest
  ): Promise<VerificationInitResponse> {
    const { userId, transactionType, transactionParams, preferredMethod, ipAddress, userAgent } = request;

    // Check rate limiting
    await this.checkRateLimit(userId);

    // Determine verification method based on risk tier
    const tier = this.determineRiskTier(transactionType, transactionParams.amount);
    const method = this.determineVerificationMethod(tier, preferredMethod);

    // Get user's contact info
    const contact = await this.getUserContact(userId, method);

    // Generate PIN
    const pin = this.generatePin();
    const pinHash = await bcrypt.hash(pin, 10);

    // Calculate expiry
    const expiresAt = new Date(
      Date.now() + VERIFICATION_CONFIG.pinExpiryMinutes * 60 * 1000
    );

    // Store verification request
    const { data: verification, error } = await this.supabase
      .from('transaction_verification_tokens')
      .insert({
        user_id: userId,
        transaction_type: transactionType,
        transaction_params: transactionParams,
        pin_hash: pinHash,
        verification_method: method,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString(),
        is_used: false,
        attempts: 0,
      })
      .select('id')
      .single();

    if (error) {
      throw new VerificationError(
        'Failed to create verification request',
        'DELIVERY_FAILED'
      );
    }

    // Send PIN via appropriate channel
    await this.sendPin(method, contact, pin);

    // Log audit entry
    await this.logAudit(userId, verification.id, 'pin_sent', {
      method,
      transactionType,
      amount: transactionParams.amount,
    });

    return {
      verificationId: verification.id,
      method,
      expiresAt,
      maskedDestination: this.maskContact(contact, method),
    };
  }

  // ==========================================================================
  // VALIDATE PIN
  // ==========================================================================

  /**
   * Validate PIN and issue verification token.
   * Returns a single-use token that can be used with CryptoExecutionService.
   */
  async validatePin(
    request: PinValidationRequest
  ): Promise<PinValidationResponse> {
    const { verificationId, pin, userId, ipAddress, userAgent } = request;

    // Get verification record
    const { data: verification, error } = await this.supabase
      .from('transaction_verification_tokens')
      .select('*')
      .eq('id', verificationId)
      .single();

    if (error || !verification) {
      return {
        success: false,
        error: 'Verification request not found',
      };
    }

    // Check user matches
    if (verification.user_id !== userId) {
      return {
        success: false,
        error: 'Verification does not belong to this user',
      };
    }

    // Check not expired
    if (new Date(verification.expires_at) < new Date()) {
      await this.logAudit(userId, verificationId, 'expired', {});
      return {
        success: false,
        error: 'Verification has expired. Please request a new PIN.',
      };
    }

    // Check not already used
    if (verification.is_used) {
      return {
        success: false,
        error: 'Verification has already been used',
      };
    }

    // Check attempts
    if (verification.attempts >= VERIFICATION_CONFIG.maxPinAttempts) {
      await this.logAudit(userId, verificationId, 'max_attempts', {});
      return {
        success: false,
        error: 'Maximum attempts exceeded. Please request a new PIN.',
      };
    }

    // Validate PIN
    const isValid = await bcrypt.compare(pin, verification.pin_hash);

    if (!isValid) {
      // Increment attempts
      await this.supabase
        .from('transaction_verification_tokens')
        .update({ attempts: verification.attempts + 1 })
        .eq('id', verificationId);

      await this.logAudit(userId, verificationId, 'pin_failed', {
        attempt: verification.attempts + 1,
      });

      const remainingAttempts =
        VERIFICATION_CONFIG.maxPinAttempts - verification.attempts - 1;

      return {
        success: false,
        error: `Invalid PIN. ${remainingAttempts} attempts remaining.`,
        remainingAttempts,
      };
    }

    // PIN is valid - create verification token
    const tokenExpiresAt = new Date(
      Date.now() + VERIFICATION_CONFIG.tokenExpirySeconds * 1000
    );

    // Update record to mark PIN validated and set token expiry
    await this.supabase
      .from('transaction_verification_tokens')
      .update({
        pin_validated_at: new Date().toISOString(),
        token_expires_at: tokenExpiresAt.toISOString(),
        // Re-validate IP for token usage
        ip_address: ipAddress,
        user_agent: userAgent,
      })
      .eq('id', verificationId);

    await this.logAudit(userId, verificationId, 'pin_validated', {});

    // Create verification token
    const token: TransactionVerificationToken = {
      tokenId: verificationId,
      userId,
      transactionType: verification.transaction_type,
      transactionParams: verification.transaction_params,
      createdAt: new Date(),
      expiresAt: tokenExpiresAt,
      isUsed: false,
      verificationMethod: verification.verification_method,
      ipAddress,
      userAgent,
    };

    return {
      success: true,
      token,
    };
  }

  // ==========================================================================
  // BIOMETRIC VERIFICATION (Lower Risk)
  // ==========================================================================

  /**
   * Verify biometric authentication for low-risk transactions.
   * This is called after the client verifies biometrics locally.
   */
  async verifyBiometric(
    userId: string,
    transactionType: TransactionType,
    transactionParams: LockedTransactionParams,
    biometricToken: string,
    ipAddress: string,
    userAgent: string
  ): Promise<PinValidationResponse> {
    // Validate that biometric is allowed for this transaction
    const tier = this.determineRiskTier(transactionType, transactionParams.amount);
    
    if (tier.verificationMethod !== 'biometric') {
      return {
        success: false,
        error: 'This transaction requires SMS or email verification',
      };
    }

    // In production: Validate biometric token with device attestation
    // For now, we trust the client's biometric verification
    if (!biometricToken || biometricToken.length < 10) {
      return {
        success: false,
        error: 'Invalid biometric verification',
      };
    }

    // Create a verification token directly for biometric auth
    const tokenExpiresAt = new Date(
      Date.now() + VERIFICATION_CONFIG.tokenExpirySeconds * 1000
    );

    const { data: verification, error } = await this.supabase
      .from('transaction_verification_tokens')
      .insert({
        user_id: userId,
        transaction_type: transactionType,
        transaction_params: transactionParams,
        pin_hash: 'BIOMETRIC_VERIFIED',
        verification_method: 'biometric',
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: tokenExpiresAt.toISOString(),
        token_expires_at: tokenExpiresAt.toISOString(),
        pin_validated_at: new Date().toISOString(),
        is_used: false,
        attempts: 0,
      })
      .select('id')
      .single();

    if (error) {
      return {
        success: false,
        error: 'Failed to create verification token',
      };
    }

    await this.logAudit(userId, verification.id, 'biometric_verified', {
      transactionType,
      amount: transactionParams.amount,
    });

    const token: TransactionVerificationToken = {
      tokenId: verification.id,
      userId,
      transactionType,
      transactionParams,
      createdAt: new Date(),
      expiresAt: tokenExpiresAt,
      isUsed: false,
      verificationMethod: 'biometric',
      ipAddress,
      userAgent,
    };

    return {
      success: true,
      token,
    };
  }

  // ==========================================================================
  // PRIVATE HELPERS
  // ==========================================================================

  /**
   * Determine the risk tier for a transaction.
   */
  private determineRiskTier(
    transactionType: TransactionType,
    amount: number
  ): RiskTierConfig {
    const tiers = VERIFICATION_TIERS[transactionType];
    return tiers.find(t => amount <= t.maxAmount) || tiers[tiers.length - 1];
  }

  /**
   * Determine verification method based on tier and preference.
   */
  private determineVerificationMethod(
    tier: RiskTierConfig,
    preferred?: VerificationMethod
  ): VerificationMethod {
    // High tier always requires SMS/email
    if (tier.tier === 'high') {
      return preferred === 'email' ? 'email' : 'sms';
    }

    // Use tier default or preference
    return tier.verificationMethod;
  }

  /**
   * Get user's contact info for verification.
   */
  private async getUserContact(
    userId: string,
    method: VerificationMethod
  ): Promise<string> {
    const { data: profile } = await this.supabase
      .from('profiles')
      .select('phone_number, email')
      .eq('id', userId)
      .single();

    if (!profile) {
      throw new VerificationError(
        'User profile not found',
        'DELIVERY_FAILED'
      );
    }

    if (method === 'sms') {
      if (!profile.phone_number) {
        throw new VerificationError(
          'No phone number on file. Please add a phone number or use email verification.',
          'DELIVERY_FAILED'
        );
      }
      return profile.phone_number;
    }

    if (!profile.email) {
      throw new VerificationError(
        'No email on file',
        'DELIVERY_FAILED'
      );
    }
    return profile.email;
  }

  /**
   * Generate a random 6-digit PIN.
   */
  private generatePin(): string {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const pin = (array[0] % 1000000).toString().padStart(6, '0');
    return pin;
  }

  /**
   * Send PIN via SMS or email.
   */
  private async sendPin(
    method: VerificationMethod,
    contact: string,
    pin: string
  ): Promise<void> {
    if (method === 'sms') {
      if (!this.smsProvider) {
        // In development, log PIN to console
        console.log(`[DEV] SMS PIN for ${contact}: ${pin}`);
        return;
      }

      const message = VERIFICATION_CONFIG.smsTemplate.replace('{pin}', pin);
      const sent = await this.smsProvider.sendSMS(contact, message);

      if (!sent) {
        throw new VerificationError(
          'Failed to send SMS. Please try again.',
          'DELIVERY_FAILED',
          true
        );
      }
    } else if (method === 'email') {
      if (!this.emailProvider) {
        // In development, log PIN to console
        console.log(`[DEV] Email PIN for ${contact}: ${pin}`);
        return;
      }

      const body = `
Your VIBEUP transaction verification PIN is: ${pin}

This PIN expires in ${VERIFICATION_CONFIG.pinExpiryMinutes} minutes.

If you did not request this verification, please secure your account immediately.

Never share this PIN with anyone. VIBEUP staff will never ask for your PIN.
      `.trim();

      const sent = await this.emailProvider.sendEmail(
        contact,
        VERIFICATION_CONFIG.emailSubject,
        body
      );

      if (!sent) {
        throw new VerificationError(
          'Failed to send email. Please try again.',
          'DELIVERY_FAILED',
          true
        );
      }
    }
  }

  /**
   * Mask contact info for display.
   */
  private maskContact(contact: string, method: VerificationMethod): string {
    if (method === 'sms') {
      // Show last 4 digits: ***-***-4567
      return `***-***-${contact.slice(-4)}`;
    }

    // Email: show first char and domain: j***@example.com
    const [local, domain] = contact.split('@');
    return `${local[0]}***@${domain}`;
  }

  /**
   * Check rate limiting for verification requests.
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await this.supabase
      .from('transaction_verification_tokens')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', oneHourAgo);

    if ((count ?? 0) >= VERIFICATION_CONFIG.maxVerificationsPerHour) {
      throw new VerificationError(
        'Too many verification requests. Please try again later.',
        'RATE_LIMITED'
      );
    }

    // Check for cooldown after failed attempts
    const { data: recentFailed } = await this.supabase
      .from('transaction_verification_tokens')
      .select('created_at')
      .eq('user_id', userId)
      .gte('attempts', VERIFICATION_CONFIG.maxPinAttempts)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (recentFailed) {
      const cooldownEnd = new Date(
        new Date(recentFailed.created_at).getTime() +
          VERIFICATION_CONFIG.cooldownAfterFailedAttemptsMinutes * 60 * 1000
      );

      if (cooldownEnd > new Date()) {
        const minutesLeft = Math.ceil(
          (cooldownEnd.getTime() - Date.now()) / 60000
        );
        throw new VerificationError(
          `Please wait ${minutesLeft} minutes before requesting a new verification.`,
          'RATE_LIMITED'
        );
      }
    }
  }

  /**
   * Log verification audit entry.
   */
  private async logAudit(
    userId: string,
    verificationId: string,
    action: string,
    details: Record<string, unknown>
  ): Promise<void> {
    await this.supabase.from('verification_audit_log').insert({
      user_id: userId,
      verification_id: verificationId,
      action,
      details,
      created_at: new Date().toISOString(),
    });
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Create a new TransactionVerificationService instance.
 */
export function createTransactionVerificationService(
  supabase: SupabaseClient
): TransactionVerificationService {
  return new TransactionVerificationService(supabase);
}

