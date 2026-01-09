-- ============================================================================
-- TRANSACTION VERIFICATION TOKENS
-- ============================================================================
-- Migration: 001_verification_tokens
-- Purpose: Enable out-of-band verification for crypto transactions
-- 
-- SECURITY: These tokens ensure Mira cannot execute transactions.
-- Every transaction requires human verification via SMS or email PIN.
-- ============================================================================

-- Transaction verification tokens table
CREATE TABLE IF NOT EXISTS transaction_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Transaction details (locked at creation, cannot be modified)
  transaction_type TEXT NOT NULL,
  transaction_params JSONB NOT NULL,
  
  -- PIN verification
  pin_hash TEXT NOT NULL,                  -- bcrypt hash of 6-digit PIN
  verification_method TEXT NOT NULL,       -- 'sms', 'email', or 'biometric'
  attempts INTEGER DEFAULT 0,              -- Failed PIN attempts
  
  -- Security context (must match on execution)
  ip_address INET NOT NULL,
  user_agent TEXT,
  
  -- State tracking
  is_used BOOLEAN DEFAULT false,           -- Single-use only
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,         -- PIN expiry (5 minutes)
  pin_validated_at TIMESTAMPTZ,            -- When PIN was successfully validated
  token_expires_at TIMESTAMPTZ,            -- Token expiry (30 seconds after PIN validation)
  used_at TIMESTAMPTZ,                     -- When token was used for execution
  
  -- Constraints
  CONSTRAINT valid_transaction_type CHECK (
    transaction_type IN ('send', 'stake', 'unstake', 'request')
  ),
  CONSTRAINT valid_verification_method CHECK (
    verification_method IN ('sms', 'email', 'biometric')
  ),
  CONSTRAINT max_attempts CHECK (attempts <= 5)
);

-- Indexes for efficient queries
CREATE INDEX idx_verification_user_created 
  ON transaction_verification_tokens(user_id, created_at DESC);

CREATE INDEX idx_verification_expiry 
  ON transaction_verification_tokens(expires_at) 
  WHERE NOT is_used;

CREATE INDEX idx_verification_user_pending 
  ON transaction_verification_tokens(user_id, is_used, expires_at)
  WHERE NOT is_used;

-- ============================================================================
-- VERIFICATION AUDIT LOG
-- ============================================================================
-- Comprehensive audit trail for all verification activities

CREATE TABLE IF NOT EXISTS verification_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verification_id UUID REFERENCES transaction_verification_tokens(id),
  
  -- Audit details
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_audit_action CHECK (
    action IN (
      'initiated',
      'pin_sent',
      'pin_validated', 
      'pin_failed',
      'biometric_verified',
      'token_used',
      'expired',
      'max_attempts'
    )
  )
);

CREATE INDEX idx_audit_user ON verification_audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_verification ON verification_audit_log(verification_id);

-- ============================================================================
-- CRYPTO AUDIT LOG (Transaction Execution)
-- ============================================================================
-- Audit trail for executed crypto transactions

CREATE TABLE IF NOT EXISTS crypto_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Audit details
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crypto_audit_user ON crypto_audit_log(user_id, created_at DESC);
CREATE INDEX idx_crypto_audit_action ON crypto_audit_log(action);

-- ============================================================================
-- USER BALANCES CACHE
-- ============================================================================
-- Cached balances for fast reads (updated by blockchain sync)

CREATE TABLE IF NOT EXISTS user_balances_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Cached balances
  usdc_balance NUMERIC(20, 8) DEFAULT 0,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_balances_user ON user_balances_cache(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE transaction_verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_balances_cache ENABLE ROW LEVEL SECURITY;

-- Verification tokens: users can only see their own
CREATE POLICY verification_tokens_select_own ON transaction_verification_tokens
  FOR SELECT USING (auth.uid() = user_id);

-- Users cannot directly insert/update tokens (service only)
CREATE POLICY verification_tokens_service_only ON transaction_verification_tokens
  FOR ALL USING (false);

-- Audit logs: users can see their own (read-only)
CREATE POLICY audit_select_own ON verification_audit_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY crypto_audit_select_own ON crypto_audit_log
  FOR SELECT USING (auth.uid() = user_id);

-- Balances: users can see their own
CREATE POLICY balances_select_own ON user_balances_cache
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- STORED PROCEDURES
-- ============================================================================

-- Safely stake VIBES tokens (atomic balance update)
CREATE OR REPLACE FUNCTION stake_vibe_tokens(
  p_user_id UUID,
  p_amount NUMERIC
) RETURNS VOID AS $$
BEGIN
  UPDATE vibe_token_balances
  SET 
    available = available - p_amount,
    staked = staked + p_amount,
    last_updated = NOW()
  WHERE user_id = p_user_id
    AND available >= p_amount;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient available balance for staking';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely unstake VIBES tokens (atomic balance update)
CREATE OR REPLACE FUNCTION unstake_vibe_tokens(
  p_user_id UUID,
  p_amount NUMERIC
) RETURNS VOID AS $$
BEGIN
  UPDATE vibe_token_balances
  SET 
    staked = staked - p_amount,
    available = available + p_amount,
    last_updated = NOW()
  WHERE user_id = p_user_id
    AND staked >= p_amount;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient staked balance for unstaking';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- CLEANUP JOB (Run periodically)
-- ============================================================================

-- Function to clean up expired verification tokens
CREATE OR REPLACE FUNCTION cleanup_expired_verification_tokens()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete tokens expired more than 24 hours ago
  DELETE FROM transaction_verification_tokens
  WHERE expires_at < NOW() - INTERVAL '24 hours';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE transaction_verification_tokens IS 
  'Out-of-band verification tokens for crypto transactions. Ensures Mira cannot execute transactions.';

COMMENT ON COLUMN transaction_verification_tokens.pin_hash IS 
  'bcrypt hash of 6-digit PIN sent via SMS/email. Never store plain PIN.';

COMMENT ON COLUMN transaction_verification_tokens.transaction_params IS 
  'Locked transaction parameters. Cannot be changed after PIN is sent.';

COMMENT ON COLUMN transaction_verification_tokens.ip_address IS 
  'IP address must match between verification and execution to prevent token theft.';

COMMENT ON TABLE verification_audit_log IS 
  'Complete audit trail of all verification attempts for security monitoring.';

