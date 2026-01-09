/**
 * CRYPTO MODULE
 * =============
 * VIBEUP's financial layer with Mira safety architecture.
 * 
 * ⚠️ SECURITY ARCHITECTURE ⚠️
 * 
 * This module implements strict separation between:
 * 
 * 1. READ-ONLY operations (safe for Mira)
 *    - Balance queries
 *    - Transaction history
 *    - Handle resolution
 *    - Transaction estimates
 * 
 * 2. EXECUTION operations (requires human verification)
 *    - Send payments
 *    - Stake/unstake VIBES
 *    - Create payment requests
 * 
 * Mira can ONLY import from the read-only interface.
 * All execution requires out-of-band verification (SMS/email PIN).
 */

// Types
export * from './types';

// Services
export {
  // Read-only service - SAFE FOR MIRA
  CryptoQueryService,
  createCryptoQueryService,
  
  // Execution service - REQUIRES VERIFICATION
  CryptoExecutionService,
  createCryptoExecutionService,
  type ExecutionContext,
  type SendPaymentRequest,
  type StakeVibeRequest,
  type UnstakeRequest,
  type CreatePaymentRequestInput,
  type ExecutionResult,
  
  // Verification service
  TransactionVerificationService,
  createTransactionVerificationService,
} from './services';

