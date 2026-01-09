# Supabase Email OTP Setup

This guide will help you enable Email OTP (One-Time Password) authentication for the VibeUp CMS.

## Why OTP Instead of Passwords?

✅ **More Secure**: No passwords to remember or store
✅ **Better UX**: Just enter email → receive code → login
✅ **No Password Resets**: No need to reset forgotten passwords
✅ **Perfect for CMS**: Limited number of admins makes this ideal

## Setup Steps

### 1. Enable Email OTP in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your VibeUp CMS project
3. Go to **Authentication** → **Providers**
4. Find **Email** provider
5. Make sure these settings are enabled:
   - ✅ **Enable Email provider**
   - ✅ **Enable Email OTP** (or "Passwordless sign-in")
6. Click **Save**

### 2. Configure OTP Settings (Optional)

In **Authentication** → **Settings**:

- **OTP Expiry**: Default is 60 seconds (you can increase to 300 seconds / 5 minutes)
- **Rate Limits**: Default is fine for CMS use (prevents spam)

### 3. Email Template (Optional)

You can customize the OTP email template:

1. Go to **Authentication** → **Email Templates**
2. Select **Magic Link** or **Email OTP**
3. Customize the email template if desired

Default template includes:
- Subject: "Your login code"
- Body: Includes the 6-digit code

### 4. Test the Setup

1. Make sure your admin emails are in the `admins` table (run the SQL scripts)
2. Go to your CMS login page
3. Enter your admin email
4. Check your email for the 6-digit code
5. Enter the code and login!

## How It Works

### Login Flow:

```
1. User enters email → Click "Send Login Code"
   ↓
2. Supabase sends 6-digit code to email
   ↓
3. User enters code → Click "Verify & Sign In"
   ↓
4. Supabase verifies code
   ↓
5. User is logged in (session created)
   ↓
6. App checks if user is in admins table
   ↓
7. If admin: Access granted ✅
   If not admin: Redirect to unauthorized page ❌
```

### Security:

- **Codes expire after 60 seconds** (configurable)
- **Rate limited** to prevent abuse
- **shouldCreateUser: false** - Only existing users can login (no signup)
- **Admin check** - Even if logged in, must be in admins table

## Troubleshooting

### "Failed to send code"

- Check that Email provider is enabled in Supabase
- Check that Email OTP is enabled
- Verify the email address exists in `auth.users` table

### "Invalid code"

- Code may have expired (default 60 seconds)
- Check for typos in the code
- Request a new code (click "Resend")

### Code not received

- Check spam folder
- Verify email address is correct
- Check Supabase email delivery logs: **Authentication** → **Logs**
- For development, you might need to configure SMTP settings

### Still using custom domain?

If you're using a custom domain for emails (like `auth.vibeup.io`):

1. Go to **Project Settings** → **Custom Domains**
2. Make sure DNS is configured correctly
3. Check that email sending is working from that domain

## Migration from Password Auth

The old password-based login still works if you want to keep it as a fallback. The auth context includes both methods:

- `signIn(email, password)` - Password login (old)
- `signInWithOTP(email)` - Send OTP code (new)
- `verifyOTP(email, token)` - Verify OTP code (new)

To completely remove password login, you can disable it in Supabase:

1. **Authentication** → **Providers**
2. Under **Email** provider, disable "Enable Password Sign-In"

## Admin Management

Remember: Users must be in the `admins` table to access the CMS:

```sql
-- Add a new admin
INSERT INTO admins (user_id)
SELECT id FROM auth.users WHERE email = 'newadmin@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- View all admins
SELECT a.*, u.email 
FROM admins a 
JOIN auth.users u ON a.user_id = u.id;

-- Remove an admin
DELETE FROM admins 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'oldadmin@example.com');
```

## Done! 🎉

Your CMS now uses secure, passwordless OTP authentication!
