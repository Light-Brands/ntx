/**
 * CRYPTO SERVICES INDEX
 * =====================
 * 
 * ⚠️ SECURITY ARCHITECTURE ⚠️
 * 
 * This module exports TWO distinct services with DIFFERENT access patterns:
 * 
 * 1. CryptoQueryService (READ-ONLY)
 *    - Safe for Mira and AI services to use
 *    - Can only read balances, history, and estimates
 *    - CANNOT execute any transactions
 * 
 * 2. CryptoExecutionService (PROTECTED)
 *    - MUST NOT be imported by Mira or AI services
 *    - Requires verification tokens for ALL operations
 *    - Only for user-initiated actions after out-of-band verification
 * 
 * 3. TransactionVerificationService
 *    - Generates and validates verification PINs
 *    - Sends PINs via SMS/email (out-of-band)
 *    - Issues single-use verification tokens
 */

// Read-only service - SAFE FOR MIRA
export {
  CryptoQueryService,
  createCryptoQueryService,
} from './CryptoQueryService';

// Execution service - PROTECTED, REQUIRES VERIFICATION
export {
  CryptoExecutionService,
  createCryptoExecutionService,
  type ExecutionContext,
  type SendPaymentRequest,
  type StakeVibeRequest,
  type UnstakeRequest,
  type CreatePaymentRequestInput,
  type ExecutionResult,
} from './CryptoExecutionService';

// Verification service - For generating/validating PINs
export {
  TransactionVerificationService,
  createTransactionVerificationService,
} from './TransactionVerificationService';

