/**
 * CRYPTO TYPES INDEX
 * ==================
 * Central export for all crypto-related types.
 */

export * from './verification';

// ============================================================================
// WALLET TYPES
// ============================================================================

export type CustodyType = 'managed' | 'connected';
export type WalletProvider = 'metamask' | 'phantom' | 'coinbase';
export type Chain = 'base' | 'solana' | 'polygon';
export type Currency = 'USDC' | 'VIBES';

export interface UserWallet {
  id: string;
  userId: string;
  handle: string;
  addresses: {
    base: string;
    solana?: string;
    polygon?: string;
  };
  custodyType: CustodyType;
  connectedWalletAddress?: string;
  connectedWalletProvider?: WalletProvider;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HandleResolution {
  handle: string;
  address: string;
  chain: Chain;
  displayName?: string;
  avatarUrl?: string;
}

// ============================================================================
// BALANCE TYPES
// ============================================================================

export interface VibeTokenBalance {
  userId: string;
  available: number;
  staked: number;
  pending: number;
  lifetime: number;
  lastUpdated: Date;
}

export interface CryptoBalances {
  usdc: number;
  vibe: VibeTokenBalance;
}

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

export type TransactionStatus = 'pending' | 'submitted' | 'confirmed' | 'failed';

export interface Transaction {
  id: string;
  fromUserId?: string;
  toUserId?: string;
  fromHandle: string;
  toHandle: string;
  amount: number;
  currency: Currency;
  chain: Chain;
  txHash?: string;
  status: TransactionStatus;
  memo?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface TransactionHistoryQuery {
  userId: string;
  limit?: number;
  offset?: number;
  currency?: Currency;
  status?: TransactionStatus;
}

// ============================================================================
// REWARD TYPES
// ============================================================================

export type VibeRewardSource =
  | 'practice_logged'
  | 'daily_affirmation'
  | 'reflection_added'
  | 'streak_bonus'
  | 'achievement_milestone'
  | 'feedback_submitted'
  | 'referral_signup'
  | 'community_contribution';

export interface VibeReward {
  id: string;
  userId: string;
  amount: number;
  source: VibeRewardSource;
  multiplier: number;
  relatedType?: string;
  relatedId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface RewardHistoryQuery {
  userId: string;
  limit?: number;
  offset?: number;
  source?: VibeRewardSource;
}

// ============================================================================
// MULTIPLIER TYPES
// ============================================================================

export interface MultiplierBreakdown {
  streak: number;
  membership: number;
  total: number;
  streakDays: number;
  membershipTier: string;
}

// ============================================================================
// STAKING TYPES
// ============================================================================

export type StakingTier = 'free_regenerative' | 'governance_power' | 'founder_status';

export interface StakePosition {
  id: string;
  userId: string;
  amount: number;
  tier: StakingTier;
  benefits: string[];
  lockedUntil: Date;
  isActive: boolean;
  createdAt: Date;
}

// ============================================================================
// MIRA CONTEXT (READ-ONLY)
// ============================================================================

/**
 * Crypto context provided to Mira - READ ONLY.
 * Mira can see this data but CANNOT execute any transactions.
 */
export interface MiraCryptoContext {
  handle: string;
  balanceUsdc: number;
  balanceVibe: number;
  stakedVibe: number;
  pendingRewards: number;
  lifetimeEarned: number;
  pendingPayments: number;
  recentRewards: VibeReward[];
  recentTransactions: Transaction[];
  multipliers: MultiplierBreakdown;
  stakingTier?: StakingTier;
}

// ============================================================================
// TRANSACTION ESTIMATION (SAFE FOR MIRA)
// ============================================================================

/**
 * Transaction estimate - safe for Mira to generate.
 * This is informational only and cannot be executed directly.
 */
export interface TransactionEstimate {
  amount: number;
  currency: Currency;
  recipientHandle?: string;
  recipientDisplayName?: string;
  estimatedFee: number;
  totalCost: number;
  hasSufficientBalance: boolean;
  requiredVerificationTier: string;
  warningMessage?: string;
}

