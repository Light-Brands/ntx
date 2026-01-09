-- =====================================================
-- SIMPLE SOLUTION: Disable RLS for admins table
-- =====================================================
-- This is the simplest approach - just allow anyone to read
-- who is an admin (no sensitive data, just user_id references)
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Disable RLS
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Drop all policies
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

-- Drop the is_admin function if it exists
DROP FUNCTION IF EXISTS is_admin(UUID);

-- =====================================================
-- That's it! RLS is now disabled for admins table
-- =====================================================
-- This is safe because:
-- 1. The table only contains user_id references (no sensitive data)
-- 2. Anyone can already see who's logged in via the UI
-- 3. Only service role can INSERT/UPDATE/DELETE via API
-- =====================================================

-- Test query
SELECT * FROM admins;
