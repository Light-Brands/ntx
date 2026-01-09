/**
 * CRYPTO VERIFICATION TYPES
 * =========================
 * Types for transaction verification ensuring Mira cannot execute transactions.
 * All crypto transactions require out-of-band human verification.
 */

// ============================================================================
// VERIFICATION TOKEN TYPES
// ============================================================================

export type TransactionType = 'send' | 'stake' | 'unstake' | 'request';
export type VerificationMethod = 'sms' | 'email' | 'biometric';
export type VerificationTier = 'low' | 'medium' | 'high';

/**
 * Transaction parameters locked at verification request time.
 * These CANNOT be modified after the PIN is sent.
 */
export interface LockedTransactionParams {
  amount: number;
  currency: 'USDC' | 'VIBES';
  recipient?: string;      // Handle for send transactions
  stakingTier?: string;    // For stake transactions
}

/**
 * Verification token created after PIN validation.
 * Single-use, short TTL, bound to specific transaction.
 */
export interface TransactionVerificationToken {
  tokenId: string;                    // UUID
  userId: string;                     // Must match requesting user
  transactionType: TransactionType;
  transactionParams: LockedTransactionParams;
  createdAt: Date;
  expiresAt: Date;                    // 30 seconds from creation
  isUsed: boolean;                    // Single use only
  verificationMethod: VerificationMethod;
  ipAddress: string;                  // Must match execution request
  userAgent: string;                  // Must match execution request
}

/**
 * Request to initiate verification process.
 */
export interface VerificationRequest {
  userId: string;
  transactionType: TransactionType;
  transactionParams: LockedTransactionParams;
  preferredMethod?: VerificationMethod;
  ipAddress: string;
  userAgent: string;
}

/**
 * Response from initiating verification.
 */
export interface VerificationInitResponse {
  verificationId: string;
  method: VerificationMethod;
  expiresAt: Date;
  maskedDestination: string;  // e.g., "***-***-4567" or "j***@example.com"
}

/**
 * Request to validate PIN and get execution token.
 */
export interface PinValidationRequest {
  verificationId: string;
  pin: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
}

/**
 * Response from successful PIN validation.
 */
export interface PinValidationResponse {
  success: boolean;
  token?: TransactionVerificationToken;
  error?: string;
  remainingAttempts?: number;
}

// ============================================================================
// RISK TIER CONFIGURATION
// ============================================================================

/**
 * Risk tier thresholds for verification requirements.
 */
export interface RiskTierConfig {
  tier: VerificationTier;
  maxAmount: number;
  verificationMethod: VerificationMethod;
  requiresBiometric: boolean;
  description: string;
}

/**
 * Risk tier configuration for different transaction types.
 */
export const VERIFICATION_TIERS: Record<TransactionType, RiskTierConfig[]> = {
  send: [
    {
      tier: 'low',
      maxAmount: 10,
      verificationMethod: 'biometric',
      requiresBiometric: true,
      description: 'Small sends - biometric only',
    },
    {
      tier: 'medium',
      maxAmount: 100,
      verificationMethod: 'biometric',
      requiresBiometric: true,
      description: 'Medium sends - biometric + in-app PIN',
    },
    {
      tier: 'high',
      maxAmount: Infinity,
      verificationMethod: 'sms',
      requiresBiometric: true,
      description: 'Large sends - biometric + SMS/email PIN',
    },
  ],
  stake: [
    {
      tier: 'high',
      maxAmount: Infinity,
      verificationMethod: 'sms',
      requiresBiometric: true,
      description: 'All stakes require SMS/email PIN (locks funds)',
    },
  ],
  unstake: [
    {
      tier: 'high',
      maxAmount: Infinity,
      verificationMethod: 'sms',
      requiresBiometric: true,
      description: 'All unstakes require SMS/email PIN',
    },
  ],
  request: [
    {
      tier: 'low',
      maxAmount: Infinity,
      verificationMethod: 'biometric',
      requiresBiometric: true,
      description: 'Payment requests - in-app PIN only',
    },
  ],
};

// ============================================================================
// VERIFICATION CONFIGURATION
// ============================================================================

export const VERIFICATION_CONFIG = {
  // PIN settings
  pinLength: 6,
  pinExpiryMinutes: 5,
  maxPinAttempts: 3,
  
  // Token settings
  tokenExpirySeconds: 30,
  
  // Rate limiting
  maxVerificationsPerHour: 10,
  cooldownAfterFailedAttemptsMinutes: 15,
  
  // SMS/Email templates
  smsTemplate: 'Your VIBEUP verification PIN: {pin}. Expires in 5 minutes. Never share this code.',
  emailSubject: 'VIBEUP Transaction Verification',
} as const;

// ============================================================================
// AUDIT TYPES
// ============================================================================

/**
 * Audit log entry for verification attempts.
 */
export interface VerificationAuditEntry {
  id: string;
  userId: string;
  verificationId: string;
  action: 'initiated' | 'pin_sent' | 'pin_validated' | 'pin_failed' | 'token_used' | 'expired';
  transactionType: TransactionType;
  amount: number;
  currency: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class VerificationError extends Error {
  constructor(
    message: string,
    public code: VerificationErrorCode,
    public recoverable: boolean = false
  ) {
    super(message);
    this.name = 'VerificationError';
  }
}

export type VerificationErrorCode =
  | 'INVALID_PIN'
  | 'PIN_EXPIRED'
  | 'MAX_ATTEMPTS_EXCEEDED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_ALREADY_USED'
  | 'TOKEN_INVALID'
  | 'PARAMS_MISMATCH'
  | 'IP_MISMATCH'
  | 'RATE_LIMITED'
  | 'VERIFICATION_REQUIRED'
  | 'DELIVERY_FAILED';

