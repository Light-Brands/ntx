/**
 * CRYPTO QUERY SERVICE
 * ====================
 * READ-ONLY service for crypto operations.
 * 
 * SAFETY: This service is the ONLY crypto interface Mira can access.
 * It provides informational queries but CANNOT execute any transactions.
 * 
 * All methods are read-only:
 * - Get balances
 * - Get transaction history
 * - Get reward history
 * - Resolve handles
 * - Estimate transactions (preview only)
 * 
 * For transaction execution, use CryptoExecutionService which requires
 * a verification token from TransactionVerificationService.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  UserWallet,
  HandleResolution,
  VibeTokenBalance,
  CryptoBalances,
  Transaction,
  TransactionHistoryQuery,
  VibeReward,
  RewardHistoryQuery,
  MultiplierBreakdown,
  StakePosition,
  MiraCryptoContext,
  TransactionEstimate,
  Currency,
  VerificationTier,
} from '../types';
import { VERIFICATION_TIERS } from '../types/verification';

// ============================================================================
// SERVICE IMPLEMENTATION
// ============================================================================

export class CryptoQueryService {
  constructor(private supabase: SupabaseClient) {}

  // ==========================================================================
  // WALLET QUERIES (Read-Only)
  // ==========================================================================

  /**
   * Get user's wallet information.
   */
  async getWallet(userId: string): Promise<UserWallet | null> {
    const { data, error } = await this.supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;

    return this.mapWalletRow(data);
  }

  /**
   * Resolve a handle to wallet address and user info.
   * Safe for Mira to call - returns public info only.
   */
  async resolveHandle(handle: string): Promise<HandleResolution | null> {
    const normalizedHandle = handle.toLowerCase().replace('@', '');

    const { data: wallet, error } = await this.supabase
      .from('user_wallets')
      .select(`
        handle,
        address_base,
        user_id
      `)
      .eq('handle', normalizedHandle)
      .single();

    if (error || !wallet) return null;

    // Get profile info for display
    const { data: profile } = await this.supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', wallet.user_id)
      .single();

    return {
      handle: wallet.handle,
      address: wallet.address_base,
      chain: 'base',
      displayName: profile?.display_name,
      avatarUrl: profile?.avatar_url,
    };
  }

  /**
   * Check if a handle is available.
   */
  async isHandleAvailable(handle: string): Promise<boolean> {
    const normalizedHandle = handle.toLowerCase();
    
    // Check reserved handles
    const RESERVED_HANDLES = [
      'admin', 'vibeup', 'mira', 'support', 'help',
      'settings', 'wallet', 'profile', 'api', 'app',
    ];
    
    if (RESERVED_HANDLES.includes(normalizedHandle)) {
      return false;
    }

    const { data } = await this.supabase
      .from('user_wallets')
      .select('id')
      .eq('handle', normalizedHandle)
      .single();

    return !data;
  }

  // ==========================================================================
  // BALANCE QUERIES (Read-Only)
  // ==========================================================================

  /**
   * Get user's USDC balance.
   */
  async getUsdcBalance(userId: string): Promise<number> {
    const wallet = await this.getWallet(userId);
    if (!wallet) return 0;

    // In production, this would query the blockchain
    // For now, return from cached balance or 0
    const { data } = await this.supabase
      .from('user_balances_cache')
      .select('usdc_balance')
      .eq('user_id', userId)
      .single();

    return data?.usdc_balance ?? 0;
  }

  /**
   * Get user's VIBES token balance.
   */
  async getVibeBalance(userId: string): Promise<VibeTokenBalance> {
    const { data, error } = await this.supabase
      .from('vibe_token_balances')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return {
        userId,
        available: 0,
        staked: 0,
        pending: 0,
        lifetime: 0,
        lastUpdated: new Date(),
      };
    }

    return {
      userId: data.user_id,
      available: Number(data.available),
      staked: Number(data.staked),
      pending: Number(data.pending),
      lifetime: Number(data.lifetime),
      lastUpdated: new Date(data.last_updated),
    };
  }

  /**
   * Get all crypto balances for a user.
   */
  async getBalances(userId: string): Promise<CryptoBalances> {
    const [usdc, vibe] = await Promise.all([
      this.getUsdcBalance(userId),
      this.getVibeBalance(userId),
    ]);

    return { usdc, vibe };
  }

  // ==========================================================================
  // TRANSACTION HISTORY (Read-Only)
  // ==========================================================================

  /**
   * Get user's transaction history.
   */
  async getTransactionHistory(
    query: TransactionHistoryQuery
  ): Promise<Transaction[]> {
    const { userId, limit = 20, offset = 0, currency, status } = query;

    let dbQuery = this.supabase
      .from('crypto_transactions')
      .select('*')
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (currency) {
      dbQuery = dbQuery.eq('currency', currency);
    }

    if (status) {
      dbQuery = dbQuery.eq('status', status);
    }

    const { data, error } = await dbQuery;

    if (error || !data) return [];

    return data.map(this.mapTransactionRow);
  }

  /**
   * Get a specific transaction by ID.
   */
  async getTransaction(
    transactionId: string,
    userId: string
  ): Promise<Transaction | null> {
    const { data, error } = await this.supabase
      .from('crypto_transactions')
      .select('*')
      .eq('id', transactionId)
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .single();

    if (error || !data) return null;

    return this.mapTransactionRow(data);
  }

  /**
   * Get count of pending payment requests for user.
   */
  async getPendingPaymentRequestCount(userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('payment_requests')
      .select('id', { count: 'exact', head: true })
      .eq('payer_user_id', userId)
      .eq('status', 'pending');

    if (error) return 0;
    return count ?? 0;
  }

  // ==========================================================================
  // REWARD HISTORY (Read-Only)
  // ==========================================================================

  /**
   * Get user's VIBES reward history.
   */
  async getRewardHistory(query: RewardHistoryQuery): Promise<VibeReward[]> {
    const { userId, limit = 20, offset = 0, source } = query;

    let dbQuery = this.supabase
      .from('vibe_rewards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (source) {
      dbQuery = dbQuery.eq('source', source);
    }

    const { data, error } = await dbQuery;

    if (error || !data) return [];

    return data.map(this.mapRewardRow);
  }

  /**
   * Get reward summary for a time period.
   */
  async getRewardSummary(
    userId: string
  ): Promise<{ today: number; thisWeek: number; thisMonth: number; allTime: number }> {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const weekStart = new Date(now.setDate(now.getDate() - 7)).toISOString();
    const monthStart = new Date(now.setDate(1)).toISOString();

    const [todayData, weekData, monthData, allTimeData] = await Promise.all([
      this.supabase
        .from('vibe_rewards')
        .select('amount')
        .eq('user_id', userId)
        .gte('created_at', todayStart),
      this.supabase
        .from('vibe_rewards')
        .select('amount')
        .eq('user_id', userId)
        .gte('created_at', weekStart),
      this.supabase
        .from('vibe_rewards')
        .select('amount')
        .eq('user_id', userId)
        .gte('created_at', monthStart),
      this.supabase
        .from('vibe_rewards')
        .select('amount')
        .eq('user_id', userId),
    ]);

    const sum = (data: { amount: number }[] | null) =>
      (data || []).reduce((acc, r) => acc + Number(r.amount), 0);

    return {
      today: sum(todayData.data),
      thisWeek: sum(weekData.data),
      thisMonth: sum(monthData.data),
      allTime: sum(allTimeData.data),
    };
  }

  // ==========================================================================
  // MULTIPLIER QUERIES (Read-Only)
  // ==========================================================================

  /**
   * Get user's current multipliers.
   */
  async getMultipliers(userId: string): Promise<MultiplierBreakdown> {
    // Get streak
    const { data: streakData } = await this.supabase
      .from('practice_streaks')
      .select('current_streak')
      .eq('user_id', userId)
      .single();

    const streakDays = streakData?.current_streak ?? 0;

    // Get membership tier
    const { data: membershipData } = await this.supabase
      .from('memberships')
      .select('tier')
      .eq('user_id', userId)
      .single();

    const membershipTier = membershipData?.tier ?? 'community';

    // Calculate multipliers
    const streakMultiplier = this.calculateStreakMultiplier(streakDays);
    const membershipMultiplier = membershipTier === 'regenerative' ? 2.0 : 1.0;

    return {
      streak: streakMultiplier,
      membership: membershipMultiplier,
      total: streakMultiplier * membershipMultiplier,
      streakDays,
      membershipTier,
    };
  }

  private calculateStreakMultiplier(days: number): number {
    if (days >= 90) return 3.0;
    if (days >= 30) return 2.5;
    if (days >= 21) return 2.0;
    if (days >= 7) return 1.5;
    return 1.0;
  }

  // ==========================================================================
  // STAKING QUERIES (Read-Only)
  // ==========================================================================

  /**
   * Get user's active stake positions.
   */
  async getStakePositions(userId: string): Promise<StakePosition[]> {
    const { data, error } = await this.supabase
      .from('stake_positions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error || !data) return [];

    return data.map(this.mapStakeRow);
  }

  /**
   * Get user's current staking tier based on active stakes.
   */
  async getStakingTier(userId: string): Promise<string | undefined> {
    const positions = await this.getStakePositions(userId);
    
    // Return highest tier
    const tierPriority = ['founder_status', 'governance_power', 'free_regenerative'];
    for (const tier of tierPriority) {
      if (positions.some(p => p.tier === tier)) {
        return tier;
      }
    }
    return undefined;
  }

  // ==========================================================================
  // MIRA CONTEXT (Read-Only - Safe for AI)
  // ==========================================================================

  /**
   * Get complete crypto context for Mira.
   * This is READ-ONLY and safe for Mira to consume.
   * Mira CANNOT execute transactions with this data.
   */
  async getMiraCryptoContext(userId: string): Promise<MiraCryptoContext> {
    const wallet = await this.getWallet(userId);

    if (!wallet) {
      return {
        handle: '',
        balanceUsdc: 0,
        balanceVibe: 0,
        stakedVibe: 0,
        pendingRewards: 0,
        lifetimeEarned: 0,
        pendingPayments: 0,
        recentRewards: [],
        recentTransactions: [],
        multipliers: {
          streak: 1,
          membership: 1,
          total: 1,
          streakDays: 0,
          membershipTier: 'community',
        },
      };
    }

    const [
      usdcBalance,
      vibeBalance,
      pendingPayments,
      recentRewards,
      recentTransactions,
      multipliers,
      stakingTier,
    ] = await Promise.all([
      this.getUsdcBalance(userId),
      this.getVibeBalance(userId),
      this.getPendingPaymentRequestCount(userId),
      this.getRewardHistory({ userId, limit: 5 }),
      this.getTransactionHistory({ userId, limit: 5 }),
      this.getMultipliers(userId),
      this.getStakingTier(userId),
    ]);

    return {
      handle: wallet.handle,
      balanceUsdc: usdcBalance,
      balanceVibe: vibeBalance.available,
      stakedVibe: vibeBalance.staked,
      pendingRewards: vibeBalance.pending,
      lifetimeEarned: vibeBalance.lifetime,
      pendingPayments,
      recentRewards,
      recentTransactions,
      multipliers,
      stakingTier: stakingTier as MiraCryptoContext['stakingTier'],
    };
  }

  // ==========================================================================
  // TRANSACTION ESTIMATION (Safe for Mira)
  // ==========================================================================

  /**
   * Estimate a transaction - DOES NOT EXECUTE.
   * Safe for Mira to call to provide information to users.
   */
  async estimateTransaction(
    userId: string,
    amount: number,
    currency: Currency,
    recipientHandle?: string
  ): Promise<TransactionEstimate> {
    const balance = currency === 'USDC' 
      ? await this.getUsdcBalance(userId)
      : (await this.getVibeBalance(userId)).available;

    const estimatedFee = currency === 'USDC' ? 0.01 : 0; // USDC has gas fee
    const totalCost = amount + estimatedFee;
    const hasSufficientBalance = balance >= totalCost;

    // Determine verification tier needed
    const tiers = VERIFICATION_TIERS.send;
    const tier = tiers.find(t => amount <= t.maxAmount) || tiers[tiers.length - 1];

    let recipientDisplayName: string | undefined;
    if (recipientHandle) {
      const resolution = await this.resolveHandle(recipientHandle);
      recipientDisplayName = resolution?.displayName;
    }

    let warningMessage: string | undefined;
    if (!hasSufficientBalance) {
      warningMessage = `Insufficient balance. You have ${balance} ${currency}, but need ${totalCost} ${currency}.`;
    } else if (amount > 1000) {
      warningMessage = 'Large transaction - will require SMS/email verification.';
    }

    return {
      amount,
      currency,
      recipientHandle,
      recipientDisplayName,
      estimatedFee,
      totalCost,
      hasSufficientBalance,
      requiredVerificationTier: tier.tier,
      warningMessage,
    };
  }

  // ==========================================================================
  // PRIVATE HELPERS
  // ==========================================================================

  private mapWalletRow(row: Record<string, unknown>): UserWallet {
    return {
      id: row.id as string,
      userId: row.user_id as string,
      handle: row.handle as string,
      addresses: {
        base: row.address_base as string,
        solana: row.address_solana as string | undefined,
        polygon: row.address_polygon as string | undefined,
      },
      custodyType: row.custody_type as UserWallet['custodyType'],
      connectedWalletAddress: row.connected_wallet_address as string | undefined,
      connectedWalletProvider: row.connected_wallet_provider as UserWallet['connectedWalletProvider'],
      isActive: row.is_active as boolean,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }

  private mapTransactionRow(row: Record<string, unknown>): Transaction {
    return {
      id: row.id as string,
      fromUserId: row.from_user_id as string | undefined,
      toUserId: row.to_user_id as string | undefined,
      fromHandle: row.from_handle as string,
      toHandle: row.to_handle as string,
      amount: Number(row.amount),
      currency: row.currency as Transaction['currency'],
      chain: row.chain as Transaction['chain'],
      txHash: row.tx_hash as string | undefined,
      status: row.status as Transaction['status'],
      memo: row.memo as string | undefined,
      createdAt: new Date(row.created_at as string),
      confirmedAt: row.confirmed_at ? new Date(row.confirmed_at as string) : undefined,
    };
  }

  private mapRewardRow(row: Record<string, unknown>): VibeReward {
    return {
      id: row.id as string,
      userId: row.user_id as string,
      amount: Number(row.amount),
      source: row.source as VibeReward['source'],
      multiplier: Number(row.multiplier),
      relatedType: row.related_type as string | undefined,
      relatedId: row.related_id as string | undefined,
      metadata: row.metadata as Record<string, unknown> | undefined,
      createdAt: new Date(row.created_at as string),
    };
  }

  private mapStakeRow(row: Record<string, unknown>): StakePosition {
    return {
      id: row.id as string,
      userId: row.user_id as string,
      amount: Number(row.amount),
      tier: row.tier as StakePosition['tier'],
      benefits: row.benefits as string[],
      lockedUntil: new Date(row.locked_until as string),
      isActive: row.is_active as boolean,
      createdAt: new Date(row.created_at as string),
    };
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

/**
 * Create a new CryptoQueryService instance.
 * This is the ONLY crypto service Mira should use.
 */
export function createCryptoQueryService(supabase: SupabaseClient): CryptoQueryService {
  return new CryptoQueryService(supabase);
}

