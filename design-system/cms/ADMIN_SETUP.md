# Admin Role Setup Guide

This guide explains how to set up admin roles for the VibeUp CMS.

## Step 1: Run the SQL Migration

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to your project
3. Go to **SQL Editor** (left sidebar)
4. Open the file `supabase-admin-setup.sql` from this project
5. Copy and paste the entire SQL script into the SQL Editor
6. Click **Run** to execute the script

This will create:
- `admins` table to link users with admin privileges
- Row Level Security (RLS) policies
- Helper function `is_admin()` for checking admin status

## Step 2: Add Admin Users

After running the migration, you need to add users as admins. You can do this in two ways:

### Option A: Using Supabase SQL Editor (Recommended)

1. Go to **Authentication > Users** in Supabase Dashboard
2. Find the user you want to make an admin
3. Copy their **User UID** (it's a UUID)
4. Go to **SQL Editor** and run:

```sql
INSERT INTO admins (user_id) 
VALUES ('<paste-user-uuid-here>');
```

Replace `<paste-user-uuid-here>` with the actual UUID.

### Option B: Using Supabase Dashboard Table Editor

1. Go to **Table Editor** in Supabase Dashboard
2. Select the `admins` table
3. Click **Insert row**
4. Paste the user UUID in the `user_id` field
5. Click **Save**

## Step 3: Verify Admin Access

1. Log in to the CMS with the admin user credentials
2. You should now have full access to the CMS
3. Non-admin users will be redirected to `/unauthorized` page

## Removing Admin Access

To remove admin access from a user:

```sql
DELETE FROM admins 
WHERE user_id = '<user-uuid>';
```

## Security Notes

- Only users listed in the `admins` table can access the CMS
- Regular authenticated users (without admin role) will see an "Access Denied" page
- The admin check happens on every page load and after login
- Admin status is cached in the auth context for performance

## Troubleshooting

**User can't access CMS after being added as admin:**
- Make sure you restarted your Next.js dev server after running the SQL migration
- Verify the user UUID is correct in the `admins` table
- Check browser console for any errors

**Getting "Access Denied" even though user is admin:**
- Clear browser cache and cookies
- Sign out and sign back in
- Verify the `admins` table has the correct `user_id`
