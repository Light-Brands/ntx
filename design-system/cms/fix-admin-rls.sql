-- =====================================================
-- Fix Admin RLS Policies
-- =====================================================
-- This fixes the 500 error by simplifying the RLS policies
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all admins" ON admins;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admins;
DROP POLICY IF EXISTS "Service role can manage admins" ON admins;

-- SIMPLIFIED POLICIES
-- =====================================================

-- Policy 1: Allow ANY authenticated user to check their own admin status
-- This removes the circular dependency and 500 errors
CREATE POLICY "Allow users to check own admin status" ON admins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Policy 2: Service role can do everything (for admin management)
CREATE POLICY "Service role full access" ON admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- Verify it works
-- =====================================================
-- Test query - this should return your admin record if you're logged in
SELECT * FROM admins WHERE user_id = auth.uid();
