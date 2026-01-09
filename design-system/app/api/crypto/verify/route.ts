/**
 * CRYPTO VERIFICATION API
 * =======================
 * Endpoints for out-of-band transaction verification.
 * 
 * POST /api/crypto/verify - Request verification PIN
 * POST /api/crypto/verify/validate - Validate PIN and get token
 * POST /api/crypto/verify/biometric - Verify biometric for low-risk transactions
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  createTransactionVerificationService,
  type TransactionType,
  type LockedTransactionParams,
  type VerificationMethod,
} from '@/lib/crypto';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================================================
// REQUEST VERIFICATION PIN
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify JWT and get user ID
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    // Get request context
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const verificationService = createTransactionVerificationService(supabase);

    switch (action) {
      case 'request':
        return handleRequestVerification(
          verificationService,
          user.id,
          body,
          ipAddress,
          userAgent
        );
      
      case 'validate':
        return handleValidatePin(
          verificationService,
          user.id,
          body,
          ipAddress,
          userAgent
        );
      
      case 'biometric':
        return handleBiometricVerification(
          verificationService,
          user.id,
          body,
          ipAddress,
          userAgent
        );
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// HANDLERS
// ============================================================================

async function handleRequestVerification(
  service: ReturnType<typeof createTransactionVerificationService>,
  userId: string,
  body: {
    transactionType: TransactionType;
    amount: number;
    currency: 'USDC' | 'VIBES';
    recipient?: string;
    stakingTier?: string;
    preferredMethod?: VerificationMethod;
  },
  ipAddress: string,
  userAgent: string
) {
  try {
    const { transactionType, amount, currency, recipient, stakingTier, preferredMethod } = body;

    // Validate required fields
    if (!transactionType || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: transactionType, amount, currency' },
        { status: 400 }
      );
    }

    const transactionParams: LockedTransactionParams = {
      amount,
      currency,
      recipient,
      stakingTier,
    };

    const result = await service.requestVerification({
      userId,
      transactionType,
      transactionParams,
      preferredMethod,
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      verificationId: result.verificationId,
      method: result.method,
      expiresAt: result.expiresAt.toISOString(),
      maskedDestination: result.maskedDestination,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'VerificationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    throw error;
  }
}

async function handleValidatePin(
  service: ReturnType<typeof createTransactionVerificationService>,
  userId: string,
  body: {
    verificationId: string;
    pin: string;
  },
  ipAddress: string,
  userAgent: string
) {
  try {
    const { verificationId, pin } = body;

    if (!verificationId || !pin) {
      return NextResponse.json(
        { error: 'Missing required fields: verificationId, pin' },
        { status: 400 }
      );
    }

    const result = await service.validatePin({
      verificationId,
      pin,
      userId,
      ipAddress,
      userAgent,
    });

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error,
          remainingAttempts: result.remainingAttempts,
        },
        { status: 400 }
      );
    }

    // Return the token for use with execution service
    return NextResponse.json({
      success: true,
      token: {
        tokenId: result.token!.tokenId,
        transactionType: result.token!.transactionType,
        transactionParams: result.token!.transactionParams,
        expiresAt: result.token!.expiresAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'VerificationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    throw error;
  }
}

async function handleBiometricVerification(
  service: ReturnType<typeof createTransactionVerificationService>,
  userId: string,
  body: {
    transactionType: TransactionType;
    amount: number;
    currency: 'USDC' | 'VIBES';
    recipient?: string;
    biometricToken: string;
  },
  ipAddress: string,
  userAgent: string
) {
  try {
    const { transactionType, amount, currency, recipient, biometricToken } = body;

    if (!transactionType || !amount || !currency || !biometricToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transactionParams: LockedTransactionParams = {
      amount,
      currency,
      recipient,
    };

    const result = await service.verifyBiometric(
      userId,
      transactionType,
      transactionParams,
      biometricToken,
      ipAddress,
      userAgent
    );

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      token: {
        tokenId: result.token!.tokenId,
        transactionType: result.token!.transactionType,
        transactionParams: result.token!.transactionParams,
        expiresAt: result.token!.expiresAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'VerificationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    throw error;
  }
}

