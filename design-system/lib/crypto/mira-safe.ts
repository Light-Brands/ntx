/**
 * MIRA-SAFE CRYPTO MODULE
 * =======================
 * This module provides the ONLY crypto interface that Mira should import.
 * 
 * ⚠️ ARCHITECTURAL BOUNDARY ⚠️
 * 
 * This file exports ONLY read-only crypto functionality.
 * Mira's service files should import from THIS file, not from the main index.
 * 
 * WHAT MIRA CAN DO:
 * - Read balances (USDC, VIBES)
 * - Read transaction history
 * - Read reward history
 * - Resolve handles to addresses
 * - Estimate transactions (preview only)
 * - Get multiplier information
 * - Get staking positions
 * 
 * WHAT MIRA CANNOT DO:
 * - Execute transactions
 * - Request verification
 * - Validate PINs
 * - Stake/unstake tokens
 * - Create payment requests
 * 
 * This separation is enforced by:
 * 1. This module only exports CryptoQueryService
 * 2. CryptoExecutionService is NOT exported here
 * 3. ESLint rules prevent Mira from importing from main crypto index
 */

import type { SupabaseClient } from '@supabase/supabase-js';

// Re-export ONLY read-only types
export type {
  // Wallet (read-only)
  UserWallet,
  HandleResolution,
  
  // Balances (read-only)
  VibeTokenBalance,
  CryptoBalances,
  
  // Transaction history (read-only)
  Transaction,
  TransactionHistoryQuery,
  TransactionStatus,
  
  // Rewards (read-only)
  VibeReward,
  RewardHistoryQuery,
  VibeRewardSource,
  
  // Multipliers (read-only)
  MultiplierBreakdown,
  
  // Staking (read-only view)
  StakePosition,
  StakingTier,
  
  // Mira context (read-only)
  MiraCryptoContext,
  
  // Transaction estimation (safe - no execution)
  TransactionEstimate,
  
  // Base types
  Chain,
  Currency,
} from './types';

// Re-export ONLY the read-only service
export {
  CryptoQueryService,
  createCryptoQueryService,
} from './services/CryptoQueryService';

/**
 * Create a Mira-safe crypto service.
 * This is the ONLY way Mira should access crypto functionality.
 */
export function createMiraCryptoService(supabase: SupabaseClient) {
  // Import here to avoid exposing execution service at module level
  const { createCryptoQueryService } = require('./services/CryptoQueryService');
  return createCryptoQueryService(supabase);
}

// ============================================================================
// COMPILE-TIME SAFETY CHECK
// ============================================================================

/**
 * @internal
 * This type ensures CryptoExecutionService is NOT accidentally exported.
 * If someone tries to export it, TypeScript will error.
 */
type _EnsureNoExecutionService = typeof import('./services/CryptoExecutionService') extends never
  ? true
  : 'ERROR: CryptoExecutionService should not be accessible from mira-safe module';

// ============================================================================
// DOCUMENTATION FOR MIRA INTEGRATION
// ============================================================================

/**
 * How to use this module in Mira's service:
 * 
 * ```typescript
 * // In MiraService.ts or MiraContextBuilder.ts
 * import { createMiraCryptoService, type MiraCryptoContext } from '@/lib/crypto/mira-safe';
 * 
 * class MiraService {
 *   private cryptoService: ReturnType<typeof createMiraCryptoService>;
 *   
 *   constructor(supabase: SupabaseClient) {
 *     this.cryptoService = createMiraCryptoService(supabase);
 *   }
 *   
 *   async getCryptoContext(userId: string): Promise<MiraCryptoContext> {
 *     // This is safe - only reads data
 *     return this.cryptoService.getMiraCryptoContext(userId);
 *   }
 *   
 *   async estimatePayment(userId: string, amount: number, recipient: string) {
 *     // This is safe - only estimates, does not execute
 *     return this.cryptoService.estimateTransaction(userId, amount, 'USDC', recipient);
 *   }
 * }
 * ```
 * 
 * Mira CANNOT:
 * - Call sendPayment() - not exported
 * - Call stakeVibe() - not exported
 * - Call requestVerification() - not exported
 * - Access CryptoExecutionService - not exported
 * - Access TransactionVerificationService - not exported
 */

