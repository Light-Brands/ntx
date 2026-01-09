# Supabase Migration Guide

This guide will walk you through migrating your VibeUp CMS from local JSON storage to Supabase.

## Prerequisites

Before starting the migration, ensure you have:

1. ✅ A Supabase account (sign up at https://supabase.com)
2. ✅ A Supabase project created
3. ✅ Your Supabase credentials ready

## Step-by-Step Migration Process

### 1. Get Your Supabase Credentials

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys" - keep this secret!)

### 2. Configure Environment Variables

1. Open the `.env.local` file in your project root (create it if it doesn't exist)
2. Add your Supabase credentials:

```env
# Existing Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Save the file

⚠️ **Important**: Never commit `.env.local` to version control!

### 3. Set Up Supabase Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the contents of `supabase-setup.sql` from your project root
4. Paste it into the SQL Editor
5. Click **Run** to execute the SQL

This will create:
- ✅ The `posts` table with all required columns
- ✅ Automatic timestamp triggers
- ✅ Row Level Security policies
- ✅ Performance indexes

### 4. Set Up Supabase Storage

1. In your Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ Enable (check this box)
4. Click **Create bucket**

#### Configure Storage Policies

After creating the bucket:

1. Click on the `blog-images` bucket
2. Go to the **Policies** tab
3. Click **New policy**
4. For quick setup (allows all operations), use this SQL:

```sql
CREATE POLICY "Allow all operations"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
```

Or follow the detailed instructions in `supabase-storage-setup.md` for more granular control.

### 5. Run the Migration Script

Now you're ready to migrate your existing data!

1. Open a terminal in your project directory
2. Run the migration script:

```bash
npm run migrate
```

The script will:
- ✅ Create a backup of your `posts.json` file
- ✅ Upload all images from `public/uploads/` to Supabase Storage
- ✅ Migrate all posts to the Supabase database
- ✅ Update image URLs to point to Supabase
- ✅ Verify the migration was successful

#### Expected Output

You should see output like this:

```
╔════════════════════════════════════════════════╗
║   VibeUp CMS - Supabase Migration Script      ║
╚════════════════════════════════════════════════╝

📂 Step 1: Checking for posts.json...
✅ Found posts.json

💾 Step 2: Creating backup...
✅ Backup created: server/data/posts.json.backup

📖 Step 3: Loading posts from JSON...
✅ Loaded 6 posts

🔌 Step 4: Testing Supabase connection...
✅ Supabase connection successful

🪣 Step 5: Checking Supabase Storage bucket...
✅ Storage bucket "blog-images" found

🚀 Step 6: Migrating 6 posts...

[1/6]
📝 Migrating: "Your Post Title"
   📤 Uploading thumbnail: ai-thumbnail-123.jpg
   ✅ Uploaded: ai-thumbnail-123.jpg
   ✅ Post migrated successfully (ID: uuid-here)

...

📊 Migration Summary:
   ✅ Successfully migrated: 6 posts
   💾 Backup saved to: server/data/posts.json.backup

✨ Migration complete!
```

### 6. Test Your CMS

1. Start your development server:

```bash
npm run dev
```

2. Open your CMS in the browser
3. Verify that:
   - ✅ All posts are displayed correctly
   - ✅ All images are loading from Supabase
   - ✅ You can create new posts
   - ✅ You can edit existing posts
   - ✅ You can delete posts
   - ✅ Image generation works and saves to Supabase

### 7. Cleanup (Optional)

Once you've confirmed everything works:

1. You can safely remove the local files:
   ```bash
   # Backup is at server/data/posts.json.backup
   # Original images are in public/uploads/
   ```

2. Keep the backup files for a while just to be safe!

## Troubleshooting

### Error: "Missing Supabase credentials"

**Solution**: Make sure you've added all three environment variables to `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Supabase connection failed"

**Solution**: 
1. Verify your credentials are correct
2. Make sure you've run the SQL setup script (`supabase-setup.sql`)
3. Check that the `posts` table exists in your Supabase dashboard

### Error: "Storage bucket 'blog-images' not found"

**Solution**: Create the storage bucket following Step 4 above.

### Images not loading

**Solution**:
1. Verify the `blog-images` bucket is set to **Public**
2. Check the storage policies allow SELECT operations
3. Inspect the browser console for specific error messages

### Migration script fails partway through

**Solution**:
- The script creates a backup before starting
- You can safely re-run the script (it uses `upsert` for images)
- Check the console output for specific error messages

## Rollback

If you need to rollback:

1. Your original data is backed up at `server/data/posts.json.backup`
2. Copy it back to `server/data/posts.json`
3. Original images remain in `public/uploads/`
4. Revert the code changes via git

## Need Help?

- Check the Supabase documentation: https://supabase.com/docs
- Review the migration script logs for specific errors
- Check your Supabase project logs in the dashboard

## What Changed?

### Before (Local Storage)
- Posts stored in `server/data/posts.json`
- Images in `public/uploads/`
- Limited to local environment

### After (Supabase)
- Posts in Supabase PostgreSQL database
- Images in Supabase Storage
- Can scale to production
- Real-time capabilities (future enhancement)
- Better performance and reliability

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 Next.js App                      │
├─────────────────────────────────────────────────┤
│                                                  │
│  Components → API Routes → Storage Layer        │
│                               ↓                  │
│                         lib/storage.ts           │
│                               ↓                  │
│                         lib/supabase.ts          │
│                               ↓                  │
├─────────────────────────────────────────────────┤
│                   Supabase                       │
│  ┌──────────────────┬────────────────────────┐  │
│  │   PostgreSQL     │   Storage Bucket       │  │
│  │   posts table    │   blog-images          │  │
│  └──────────────────┴────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Next Steps

After successful migration, you can:

1. Deploy your CMS to production (Vercel, Netlify, etc.)
2. Set up authentication (Supabase Auth)
3. Enable real-time features
4. Add more advanced querying and filtering
5. Implement image optimization workflows

Congratulations! Your CMS is now powered by Supabase! 🎉

