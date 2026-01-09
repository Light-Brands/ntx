# Supabase Storage Setup Instructions

## Step 1: Create Storage Bucket

1. Open your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **New bucket**
5. Enter the following details:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **Enable** (check this box)
   - **File size limit**: 50 MB (default is fine)
   - **Allowed MIME types**: Leave empty for now (allows all)
6. Click **Create bucket**

## Step 2: Configure Storage Policies

After creating the bucket, you need to set up access policies:

1. Click on the `blog-images` bucket
2. Go to the **Policies** tab
3. Click **New Policy**

### Policy 1: Public Read Access

- **Policy name**: `Public read access`
- **Allowed operations**: `SELECT`
- **Target roles**: `public`
- **Policy definition**: 
  ```sql
  CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');
  ```

### Policy 2: Authenticated Upload/Update

- **Policy name**: `Authenticated upload`
- **Allowed operations**: `INSERT`, `UPDATE`
- **Target roles**: `authenticated`
- **Policy definition**:
  ```sql
  CREATE POLICY "Authenticated upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');
  ```

### Policy 3: Authenticated Delete

- **Policy name**: `Authenticated delete`
- **Allowed operations**: `DELETE`
- **Target roles**: `authenticated`
- **Policy definition**:
  ```sql
  CREATE POLICY "Authenticated delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images');
  ```

## Alternative: Allow All Operations (For Testing)

If you want to allow all operations without authentication (for testing purposes), you can create a single policy:

```sql
CREATE POLICY "Allow all operations"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
```

⚠️ **Warning**: This allows anyone to upload, update, and delete images. Use only for testing!

## Step 3: Verify Setup

1. The bucket should appear in your Storage section
2. The policies should be listed under the Policies tab
3. You should see a green checkmark indicating the bucket is public

## Troubleshooting

- If you can't upload images, check the storage policies
- If images don't display, ensure the bucket is set to Public
- Check the browser console for any error messages

## Next Steps

After completing these steps, return to the codebase and continue with the migration process.

