-- =====================================================
-- COMPLETE RESET of Admin RLS
-- =====================================================
-- This completely resets RLS to fix infinite recursion
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Step 1: Disable RLS temporarily
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies (even ones we don't know about)
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'admins'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON admins';
    END LOOP;
END $$;

-- Step 3: Drop the is_admin function if it exists (it might be causing recursion)
DROP FUNCTION IF EXISTS is_admin(UUID);

-- Step 4: Re-enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Step 5: Create ONE simple policy
-- Allow authenticated users to read their own admin record
CREATE POLICY "authenticated_read_own" ON admins
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Step 6: Allow service role full access for management
CREATE POLICY "service_role_all" ON admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- Verify policies
-- =====================================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'admins';

-- =====================================================
-- Test the policy
-- =====================================================
-- This should return your admin record (or empty if not admin)
SELECT * FROM admins WHERE user_id = auth.uid();
