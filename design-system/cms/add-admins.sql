-- =====================================================
-- Add Admin Users
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- This will add the specified users as admins
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

-- =====================================================
-- Verify the admins were added
-- =====================================================
SELECT 
  a.id as admin_id,
  a.user_id,
  u.email,
  a.created_at
FROM admins a
JOIN auth.users u ON a.user_id = u.id
WHERE u.email IN ('luke@vibeup.io', 'drix.demou@gmail.com', 'dan@vibeup.io')
ORDER BY a.created_at;
