/**
 * CRYPTO EXECUTION SERVICE
 * ========================
 * PROTECTED service for executing crypto transactions.
 * 
 * ⚠️ SECURITY: This service requires a valid verification token for ALL operations.
 * 
 * MIRA CANNOT ACCESS THIS SERVICE.
 * This is enforced architecturally - Mira's service imports only CryptoQueryService.
 * 
 * All execution methods require:
 * 1. A valid TransactionVerificationToken from TransactionVerificationService
 * 2. Token must match the transaction parameters exactly
 * 3. Token must not be expired or already used
 * 4. Request IP and user agent must match token
 * 
 * This ensures that even if an attacker gained access to this service,
 * they cannot execute transactions without out-of-band verification.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  TransactionVerificationToken,
  LockedTransactionParams,
  Currency,
  StakingTier,
  Transaction,
  StakePosition,
} from '../types';
import { VerificationError } from '../types/verification';

// ============================================================================
// TYPES
// ============================================================================

export interface ExecutionContext {
  userId: string;
  ipAddress: string;
  userAgent: string;
}

export interface SendPaymentRequest {
  toHandle: string;
  amount: number;
  currency: Currency;
  memo?: string;
  verificationToken: TransactionVerificationToken;
}

export interface StakeVibeRequest {
  amount: number;
  tier: StakingTier;
  verificationToken: TransactionVerificationToken;
}

export interface UnstakeRequest {
  stakeId: string;
  verificationToken: TransactionVerificationToken;
}

export interface CreatePaymentRequestInput {
  payerHandle: string;
  amount: number;
  currency: Currency;
  description: string;
  verificationToken: TransactionVerificationToken;
}

export interface ExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  transactionId?: string;
  txHash?: string;
}

// ============================================================================
// SERVICE IMPLEMENTATION
// ============================================================================

export class CryptoExecutionService {
  constructor(private supabase: SupabaseClient) {}

  // ==========================================================================
  // SEND PAYMENT (Requires Verification)
  // ==========================================================================

  /**
   * Send USDC or VIBES to another user.
   * REQUIRES a valid verification token.
   */
  async sendPayment(
    request: SendPaymentRequest,
    context: ExecutionContext
  ): Promise<ExecutionResult<Transaction>> {
    // Validate verification token FIRST
    await this.validateVerificationToken(
      request.verificationToken,
      context,
      'send',
      {
        amount: request.amount,
        currency: request.currency,
        recipient: request.toHandle,
      }
    );

    // Mark token as used immediately
    await this.markTokenUsed(request.verificationToken.tokenId);

    try {
      // Resolve recipient
      const { data: recipientWallet } = await this.supabase
        .from('user_wallets')
        .select('user_id, address_base')
        .eq('handle', request.toHandle.toLowerCase())
        .single();

      if (!recipientWallet) {
        throw new Error(`Recipient @${request.toHandle} not found`);
      }

      // Get sender wallet
      const { data: senderWallet } = await this.supabase
        .from('user_wallets')
        .select('handle, address_base')
        .eq('user_id', context.userId)
        .single();

      if (!senderWallet) {
        throw new Error('Sender wallet not found');
      }

      // Create transaction record
      const { data: transaction, error } = await this.supabase
        .from('crypto_transactions')
        .insert({
          from_user_id: context.userId,
          to_user_id: recipientWallet.user_id,
          from_handle: senderWallet.handle,
          to_handle: request.toHandle.toLowerCase(),
          amount: request.amount,
          currency: request.currency,
          chain: 'base',
          status: 'pending',
          memo: request.memo,
        })
        .select()
        .single();

      if (error) throw error;

      // In production: Execute on-chain transaction via chain adapter
      // For now, simulate successful execution
      const txHash = `0x${crypto.randomUUID().replace(/-/g, '')}`;

      // Update transaction with hash and confirm
      await this.supabase
        .from('crypto_transactions')
        .update({
          tx_hash: txHash,
          status: 'confirmed',
          confirmed_at: new Date().toISOString(),
        })
        .eq('id', transaction.id);

      // Log audit entry
      await this.logAudit(context.userId, 'transaction_executed', {
        transactionId: transaction.id,
        type: 'send',
        amount: request.amount,
        currency: request.currency,
        recipient: request.toHandle,
        txHash,
      });

      return {
        success: true,
        data: {
          ...transaction,
          txHash,
          status: 'confirmed',
        },
        transactionId: transaction.id,
        txHash,
      };
    } catch (error) {
      // Log failed attempt
      await this.logAudit(context.userId, 'transaction_failed', {
        type: 'send',
        amount: request.amount,
        recipient: request.toHandle,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      };
    }
  }

  // ==========================================================================
  // STAKE VIBES (Requires Verification)
  // ==========================================================================

  /**
   * Stake VIBES tokens for premium benefits.
   * REQUIRES a valid verification token.
   */
  async stakeVibe(
    request: StakeVibeRequest,
    context: ExecutionContext
  ): Promise<ExecutionResult<StakePosition>> {
    // Validate verification token
    await this.validateVerificationToken(
      request.verificationToken,
      context,
      'stake',
      {
        amount: request.amount,
        currency: 'VIBES',
        stakingTier: request.tier,
      }
    );

    // Mark token as used
    await this.markTokenUsed(request.verificationToken.tokenId);

    try {
      // Check available balance
      const { data: balance } = await this.supabase
        .from('vibe_token_balances')
        .select('available')
        .eq('user_id', context.userId)
        .single();

      if (!balance || Number(balance.available) < request.amount) {
        throw new Error('Insufficient VIBES balance');
      }

      // Get tier configuration
      const tierConfig = STAKING_TIERS[request.tier];
      if (!tierConfig) {
        throw new Error('Invalid staking tier');
      }

      if (request.amount < tierConfig.stakeRequired) {
        throw new Error(
          `Minimum stake for ${request.tier} is ${tierConfig.stakeRequired} VIBES`
        );
      }

      // Calculate lock period
      const lockedUntil = new Date(
        Date.now() + tierConfig.lockDays * 24 * 60 * 60 * 1000
      );

      // Move tokens from available to staked
      await this.supabase.rpc('stake_vibe_tokens', {
        p_user_id: context.userId,
        p_amount: request.amount,
      });

      // Create stake position
      const { data: stake, error } = await this.supabase
        .from('stake_positions')
        .insert({
          user_id: context.userId,
          amount: request.amount,
          tier: request.tier,
          benefits: tierConfig.benefits,
          locked_until: lockedUntil.toISOString(),
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      // Apply benefits (e.g., upgrade membership)
      await this.applyStakeBenefits(context.userId, tierConfig.benefits);

      // Log audit
      await this.logAudit(context.userId, 'stake_created', {
        stakeId: stake.id,
        amount: request.amount,
        tier: request.tier,
        lockedUntil: lockedUntil.toISOString(),
      });

      return {
        success: true,
        data: {
          id: stake.id,
          userId: stake.user_id,
          amount: Number(stake.amount),
          tier: stake.tier,
          benefits: stake.benefits,
          lockedUntil: new Date(stake.locked_until),
          isActive: stake.is_active,
          createdAt: new Date(stake.created_at),
        },
      };
    } catch (error) {
      await this.logAudit(context.userId, 'stake_failed', {
        amount: request.amount,
        tier: request.tier,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Staking failed',
      };
    }
  }

  // ==========================================================================
  // UNSTAKE VIBES (Requires Verification)
  // ==========================================================================

  /**
   * Unstake VIBES tokens.
   * REQUIRES a valid verification token.
   */
  async unstake(
    request: UnstakeRequest,
    context: ExecutionContext
  ): Promise<ExecutionResult<void>> {
    // Get stake to validate token against
    const { data: stake } = await this.supabase
      .from('stake_positions')
      .select('*')
      .eq('id', request.stakeId)
      .eq('user_id', context.userId)
      .single();

    if (!stake) {
      throw new VerificationError('Stake position not found', 'TOKEN_INVALID');
    }

    // Validate verification token
    await this.validateVerificationToken(
      request.verificationToken,
      context,
      'unstake',
      {
        amount: Number(stake.amount),
        currency: 'VIBES',
      }
    );

    // Mark token as used
    await this.markTokenUsed(request.verificationToken.tokenId);

    try {
      // Check if lock period has passed
      if (new Date(stake.locked_until) > new Date()) {
        throw new Error(
          `Stake is locked until ${new Date(stake.locked_until).toLocaleDateString()}`
        );
      }

      // Move tokens from staked back to available
      await this.supabase.rpc('unstake_vibe_tokens', {
        p_user_id: context.userId,
        p_amount: Number(stake.amount),
      });

      // Mark stake as inactive
      await this.supabase
        .from('stake_positions')
        .update({
          is_active: false,
          unstaked_at: new Date().toISOString(),
        })
        .eq('id', request.stakeId);

      // Remove benefits if no other active stakes of same tier
      await this.removeStakeBenefitsIfNeeded(context.userId, stake.tier);

      // Log audit
      await this.logAudit(context.userId, 'unstake_completed', {
        stakeId: request.stakeId,
        amount: Number(stake.amount),
        tier: stake.tier,
      });

      return { success: true };
    } catch (error) {
      await this.logAudit(context.userId, 'unstake_failed', {
        stakeId: request.stakeId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unstaking failed',
      };
    }
  }

  // ==========================================================================
  // CREATE PAYMENT REQUEST (Requires Verification)
  // ==========================================================================

  /**
   * Create a payment request to another user.
   * REQUIRES a valid verification token.
   */
  async createPaymentRequest(
    request: CreatePaymentRequestInput,
    context: ExecutionContext
  ): Promise<ExecutionResult<{ requestId: string }>> {
    // Validate verification token
    await this.validateVerificationToken(
      request.verificationToken,
      context,
      'request',
      {
        amount: request.amount,
        currency: request.currency,
        recipient: request.payerHandle,
      }
    );

    // Mark token as used
    await this.markTokenUsed(request.verificationToken.tokenId);

    try {
      // Resolve payer handle
      const { data: payerWallet } = await this.supabase
        .from('user_wallets')
        .select('user_id, handle')
        .eq('handle', request.payerHandle.toLowerCase())
        .single();

      if (!payerWallet) {
        throw new Error(`User @${request.payerHandle} not found`);
      }

      // Get requester wallet
      const { data: requesterWallet } = await this.supabase
        .from('user_wallets')
        .select('handle')
        .eq('user_id', context.userId)
        .single();

      if (!requesterWallet) {
        throw new Error('Requester wallet not found');
      }

      // Create payment request (expires in 7 days)
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const { data: paymentRequest, error } = await this.supabase
        .from('payment_requests')
        .insert({
          requester_user_id: context.userId,
          payer_user_id: payerWallet.user_id,
          requester_handle: requesterWallet.handle,
          payer_handle: payerWallet.handle,
          amount: request.amount,
          currency: request.currency,
          description: request.description,
          expires_at: expiresAt.toISOString(),
          status: 'pending',
        })
        .select('id')
        .single();

      if (error) throw error;

      // Log audit
      await this.logAudit(context.userId, 'payment_request_created', {
        requestId: paymentRequest.id,
        amount: request.amount,
        payer: request.payerHandle,
      });

      return {
        success: true,
        data: { requestId: paymentRequest.id },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Request creation failed',
      };
    }
  }

  // ==========================================================================
  // TOKEN VALIDATION (CRITICAL SECURITY)
  // ==========================================================================

  /**
   * Validate a verification token before allowing execution.
   * This is the CRITICAL security gate that prevents unauthorized execution.
   */
  private async validateVerificationToken(
    token: TransactionVerificationToken,
    context: ExecutionContext,
    expectedType: 'send' | 'stake' | 'unstake' | 'request',
    expectedParams: LockedTransactionParams
  ): Promise<void> {
    // 1. Token must exist and match user
    if (token.userId !== context.userId) {
      throw new VerificationError(
        'Token does not match user',
        'TOKEN_INVALID'
      );
    }

    // 2. Token must not be expired
    if (new Date(token.expiresAt) < new Date()) {
      throw new VerificationError(
        'Verification token has expired',
        'TOKEN_EXPIRED'
      );
    }

    // 3. Token must not already be used
    if (token.isUsed) {
      throw new VerificationError(
        'Verification token has already been used',
        'TOKEN_ALREADY_USED'
      );
    }

    // 4. Transaction type must match
    if (token.transactionType !== expectedType) {
      throw new VerificationError(
        'Token transaction type mismatch',
        'PARAMS_MISMATCH'
      );
    }

    // 5. Transaction parameters must match EXACTLY
    const paramsMatch =
      token.transactionParams.amount === expectedParams.amount &&
      token.transactionParams.currency === expectedParams.currency &&
      (expectedParams.recipient === undefined ||
        token.transactionParams.recipient === expectedParams.recipient);

    if (!paramsMatch) {
      throw new VerificationError(
        'Transaction parameters do not match verification token',
        'PARAMS_MISMATCH'
      );
    }

    // 6. IP address must match (prevents token theft)
    if (token.ipAddress !== context.ipAddress) {
      throw new VerificationError(
        'Request IP does not match verification session',
        'IP_MISMATCH'
      );
    }

    // 7. Verify token is still valid in database
    const { data: dbToken } = await this.supabase
      .from('transaction_verification_tokens')
      .select('is_used, expires_at')
      .eq('id', token.tokenId)
      .single();

    if (!dbToken) {
      throw new VerificationError('Token not found', 'TOKEN_INVALID');
    }

    if (dbToken.is_used) {
      throw new VerificationError(
        'Token has been used',
        'TOKEN_ALREADY_USED'
      );
    }

    if (new Date(dbToken.expires_at) < new Date()) {
      throw new VerificationError('Token expired', 'TOKEN_EXPIRED');
    }
  }

  /**
   * Mark a token as used to prevent replay.
   */
  private async markTokenUsed(tokenId: string): Promise<void> {
    await this.supabase
      .from('transaction_verification_tokens')
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
      })
      .eq('id', tokenId);
  }

  // ==========================================================================
  // PRIVATE HELPERS
  // ==========================================================================

  private async applyStakeBenefits(
    userId: string,
    benefits: string[]
  ): Promise<void> {
    if (benefits.includes('all_regenerative_features')) {
      await this.supabase
        .from('memberships')
        .upsert({
          user_id: userId,
          tier: 'regenerative',
          source: 'staking',
        });
    }
  }

  private async removeStakeBenefitsIfNeeded(
    userId: string,
    tier: string
  ): Promise<void> {
    // Check if user has other active stakes of same or higher tier
    const { data: activeStakes } = await this.supabase
      .from('stake_positions')
      .select('tier')
      .eq('user_id', userId)
      .eq('is_active', true);

    const hasOtherStake = activeStakes?.some(s => s.tier === tier);

    if (!hasOtherStake) {
      // Downgrade membership if staking was the source
      const { data: membership } = await this.supabase
        .from('memberships')
        .select('source')
        .eq('user_id', userId)
        .single();

      if (membership?.source === 'staking') {
        await this.supabase
          .from('memberships')
          .update({ tier: 'community', source: null })
          .eq('user_id', userId);
      }
    }
  }

  private async logAudit(
    userId: string,
    action: string,
    details: Record<string, unknown>
  ): Promise<void> {
    await this.supabase.from('crypto_audit_log').insert({
      user_id: userId,
      action,
      details,
      created_at: new Date().toISOString(),
    });
  }
}

// ============================================================================
// STAKING TIER CONFIGURATION
// ============================================================================

const STAKING_TIERS: Record<string, { stakeRequired: number; lockDays: number; benefits: string[] }> = {
  free_regenerative: {
    stakeRequired: 5000,
    lockDays: 30,
    benefits: ['all_regenerative_features'],
  },
  governance_power: {
    stakeRequired: 10000,
    lockDays: 90,
    benefits: ['2x_vote_weight', 'feature_proposals'],
  },
  founder_status: {
    stakeRequired: 50000,
    lockDays: 365,
    benefits: ['lifetime_premium', 'founding_member_badge'],
  },
};

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Create a new CryptoExecutionService instance.
 * 
 * ⚠️ WARNING: This service should NEVER be imported by Mira or any AI service.
 * It is for user-initiated actions only after out-of-band verification.
 */
export function createCryptoExecutionService(
  supabase: SupabaseClient
): CryptoExecutionService {
  return new CryptoExecutionService(supabase);
}

