-- =====================================================
-- VibeUp CMS - Complete Admin Setup
-- =====================================================
-- Run this ENTIRE script in your Supabase SQL Editor
-- Location: https://app.supabase.com/project/_/sql/new
-- =====================================================

-- STEP 1: Create admins table
-- =====================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Admins can view all admins" ON admins;
DROP POLICY IF EXISTS "Users can view their own admin status" ON admins;
DROP POLICY IF EXISTS "Service role can manage admins" ON admins;

-- Create policies
-- Allow admins to view all admin records
CREATE POLICY "Admins can view all admins" ON admins
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- Allow users to check if they are an admin
CREATE POLICY "Users can view their own admin status" ON admins
  FOR SELECT
  USING (user_id = auth.uid());

-- Service role can manage admins (for initial setup and management)
CREATE POLICY "Service role can manage admins" ON admins
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS admins_user_id_idx ON admins(user_id);

-- Helper Function: Check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 2: Add Admin Users
-- =====================================================
-- Add luke@vibeup.io as admin
INSERT INTO admins (user_id)
SELECT id FROM auth.users WHERE email = 'luke@vibeup.io'
ON CONFLICT (user_id) DO NOTHING;

-- Add drix.demou@gmail.com as admin
INSERT INTO admins (user_id)
SELECT id FROM auth.users WHERE email = 'drix.demou@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- Add dan@vibeup.io as admin
INSERT INTO admins (user_id)
SELECT id FROM auth.users WHERE email = 'dan@vibeup.io'
ON CONFLICT (user_id) DO NOTHING;

-- STEP 3: Verify the Setup
-- =====================================================
-- This will show all admin users
SELECT 
  a.id as admin_id,
  a.user_id,
  u.email,
  a.created_at
FROM admins a
JOIN auth.users u ON a.user_id = u.id
ORDER BY a.created_at;

-- =====================================================
-- Setup Complete!
-- =====================================================
-- If you see your email in the results above, you're all set!
-- If you don't see any results, it means:
-- 1. The email addresses don't exist in auth.users yet
-- 2. You need to sign up first before running this script
-- 
-- To add more admins in the future:
-- INSERT INTO admins (user_id) 
-- SELECT id FROM auth.users WHERE email = 'new-admin@example.com'
-- ON CONFLICT (user_id) DO NOTHING;
-- =====================================================
