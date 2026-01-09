# VibeUp CMS - Complete Setup Instructions

## 🎯 Overview

Your VibeUp CMS has been successfully configured to use Supabase for cloud storage! This document provides step-by-step instructions to complete the setup.

## ✅ What's Been Done

The following has been completed automatically:

1. ✅ Installed `@supabase/supabase-js` package
2. ✅ Created Supabase client configuration (`lib/supabase.ts`)
3. ✅ Rewritten storage layer to use Supabase (`lib/storage.ts`)
4. ✅ Updated API routes to work with Supabase
5. ✅ Updated image generation to upload to Supabase Storage
6. ✅ Created migration script (`scripts/migrate-to-supabase.ts`)
7. ✅ Created database setup SQL (`supabase-setup.sql`)
8. ✅ Created storage setup guide (`supabase-storage-setup.md`)
9. ✅ Updated environment file examples
10. ✅ Updated documentation (README.md)

## 🚀 What You Need To Do

### Step 1: Add Supabase Credentials to .env.local

Open your `.env.local` file and add your Supabase credentials:

```env
# Keep your existing Gemini API key
GEMINI_API_KEY=your_existing_key

# Add these Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these values:**
1. Go to https://app.supabase.com
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Set Up Supabase Database

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click **New query**
4. Open the file `supabase-setup.sql` from your project root
5. Copy its entire contents
6. Paste into the SQL Editor
7. Click **Run** to execute

This creates:
- The `posts` table with all columns
- Automatic timestamp triggers
- Row Level Security policies
- Performance indexes

### Step 3: Set Up Supabase Storage

1. In your Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Enter name: `blog-images`
4. ✅ Check **"Public bucket"**
5. Click **Create bucket**

#### Configure Storage Policies

After creating the bucket:

1. Click on the `blog-images` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Choose **"For full customization"**
5. Use this SQL:

```sql
CREATE POLICY "Allow all operations"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
```

6. Click **Review** then **Save policy**

For detailed instructions, see `supabase-storage-setup.md`

### Step 4: Run the Migration Script

Now migrate your existing posts and images to Supabase:

```bash
npm run migrate
```

**What this does:**
- ✅ Creates a backup of your `posts.json`
- ✅ Uploads all images from `public/uploads/` to Supabase Storage
- ✅ Migrates all posts to Supabase database
- ✅ Updates image URLs to point to Supabase
- ✅ Verifies the migration

**Expected output:**
```
╔════════════════════════════════════════════════╗
║   VibeUp CMS - Supabase Migration Script      ║
╚════════════════════════════════════════════════╝

✅ Found posts.json
✅ Backup created
✅ Loaded 6 posts
✅ Supabase connection successful
✅ Storage bucket "blog-images" found
🚀 Migrating 6 posts...

✅ Successfully migrated: 6 posts
✨ Migration complete!
```

### Step 5: Test Your CMS

Start your development server:

```bash
npm run dev
```

Open http://localhost:3000 and verify:

1. ✅ All existing posts are displayed
2. ✅ All images are loading from Supabase
3. ✅ You can create new posts
4. ✅ You can edit existing posts
5. ✅ You can delete posts
6. ✅ AI image generation works and saves to Supabase
7. ✅ AI article generation works

### Step 6: Test CRUD Operations

Test each operation thoroughly:

#### Create Test
1. Go to "AI Generator"
2. Generate a new article
3. Verify it appears in "All Posts"
4. Check that the image is hosted on Supabase (URL should contain `.supabase.co`)

#### Read Test
1. Go to "All Posts"
2. View a post
3. Verify all content displays correctly
4. Verify images load

#### Update Test
1. Click "Edit" on a post
2. Modify the content
3. Save changes
4. Verify changes are persisted

#### Delete Test
1. Delete a test post
2. Verify it's removed from the list
3. Check that the image is also deleted from Supabase Storage

## 🎉 Success!

Once all tests pass, your CMS is fully migrated to Supabase!

## 📋 Cleanup (Optional)

After confirming everything works, you can optionally remove:
- `server/data/posts.json` (backup exists at `.backup`)
- `public/uploads/` directory (images now in Supabase)

⚠️ **Keep the backup files for at least a week** to ensure nothing is lost!

## 📖 Additional Resources

- **Full Migration Guide**: [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)
- **Storage Setup**: [supabase-storage-setup.md](supabase-storage-setup.md)
- **Database Schema**: [supabase-setup.sql](supabase-setup.sql)

## ❓ Troubleshooting

### "Missing Supabase credentials"
- Ensure all three environment variables are in `.env.local`
- Restart your dev server after adding credentials

### "Supabase connection failed"
- Verify credentials are correct
- Make sure you've run the SQL setup script
- Check that the `posts` table exists

### "Storage bucket not found"
- Create the `blog-images` bucket in Supabase
- Make sure it's set to Public
- Configure the storage policies

### Images not loading
- Verify bucket is Public
- Check storage policies allow SELECT
- Look for errors in browser console

### Migration script errors
- Ensure `.env.local` has all Supabase credentials
- Make sure database table exists
- Make sure storage bucket exists
- Check file paths in error messages

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check the terminal/server logs
3. Review the [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)
4. Check Supabase project logs in dashboard
5. Verify all prerequisites are met

## 🚀 Next Steps

After successful migration, you can:

1. **Deploy to Production**: Use Vercel, Netlify, or any hosting platform
2. **Add Authentication**: Implement Supabase Auth for multi-user support
3. **Enable Real-time**: Use Supabase real-time features for collaborative editing
4. **Add More Features**: Image optimization, scheduled publishing, etc.

---

**Congratulations!** Your CMS is now powered by Supabase! 🎉

