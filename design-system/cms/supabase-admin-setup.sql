-- =====================================================
-- VibeUp CMS - Admin Roles Setup
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Location: https://app.supabase.com/project/_/sql/new
-- =====================================================

-- Create admins table to link auth users with admin role
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
-- Note: This policy allows service role to insert/update/delete
-- You'll need to use the service role key for admin management operations
CREATE POLICY "Service role can manage admins" ON admins
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS admins_user_id_idx ON admins(user_id);

-- =====================================================
-- Helper Function: Check if user is admin
-- =====================================================
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Next steps:
-- 1. Add admin users by inserting into admins table:
--    INSERT INTO admins (user_id) 
--    VALUES ('<user-uuid-from-auth-users-table>');
--
-- 2. To find user UUIDs, go to Authentication > Users in Supabase Dashboard
--
-- 3. Example:
--    INSERT INTO admins (user_id) 
--    VALUES ('123e4567-e89b-12d3-a456-426614174000');
-- =====================================================
