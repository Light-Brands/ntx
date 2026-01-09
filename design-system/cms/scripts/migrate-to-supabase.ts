#!/usr/bin/env node
/**
 * Migration Script: Local JSON + Files → Supabase Database + Storage
 * 
 * This script migrates all blog posts from server/data/posts.json to Supabase
 * and uploads all images from public/uploads/ to Supabase Storage.
 * 
 * Prerequisites:
 * 1. Supabase project created with credentials in .env.local
 * 2. Database table 'posts' created (run supabase-setup.sql)
 * 3. Storage bucket 'blog-images' created and configured as public
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile, access } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configuration
const POSTS_FILE = join(process.cwd(), 'server', 'data', 'posts.json');
const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads');
const BACKUP_FILE = join(process.cwd(), 'server', 'data', 'posts.json.backup');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  console.error('Required variables:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface OldPost {
  id: string;
  title: string;
  content: string;
  summary?: string;
  category?: string;
  tags?: string[];
  status?: string;
  thumbnailUrl?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface NewPost {
  title: string;
  content: string;
  summary?: string | null;
  category?: string | null;
  tags?: string[] | null;
  status?: string;
  thumbnail_url?: string | null;
  author?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Upload an image file to Supabase Storage
 */
async function uploadImageToSupabase(localPath: string, filename: string): Promise<string | null> {
  try {
    const fullPath = join(UPLOADS_DIR, filename);
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      console.warn(`   ⚠️  Image file not found: ${filename}`);
      return null;
    }

    // Read the file
    const fileBuffer = await readFile(fullPath);
    
    // Upload to Supabase Storage
    const storagePath = `uploads/${filename}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true, // Overwrite if already exists
      });

    if (error) {
      console.error(`   ❌ Failed to upload ${filename}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(storagePath);

    console.log(`   ✅ Uploaded: ${filename}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`   ❌ Error uploading ${filename}:`, error);
    return null;
  }
}

/**
 * Migrate a single post to Supabase
 */
async function migratePost(oldPost: OldPost): Promise<boolean> {
  try {
    console.log(`\n📝 Migrating: "${oldPost.title}"`);

    // Handle thumbnail upload
    let thumbnailUrl: string | null = null;
    if (oldPost.thumbnailUrl) {
      const filename = oldPost.thumbnailUrl.split('/').pop();
      if (filename) {
        console.log(`   📤 Uploading thumbnail: ${filename}`);
        thumbnailUrl = await uploadImageToSupabase(oldPost.thumbnailUrl, filename);
      }
    }

    // Transform old post format to new Supabase format
    const newPost: NewPost = {
      title: oldPost.title,
      content: oldPost.content,
      summary: oldPost.summary || null,
      category: oldPost.category || null,
      tags: oldPost.tags || [],
      status: oldPost.status || 'draft',
      thumbnail_url: thumbnailUrl,
      author: oldPost.author || null,
      created_at: oldPost.createdAt || new Date().toISOString(),
      updated_at: oldPost.updatedAt || new Date().toISOString(),
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('posts')
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error(`   ❌ Failed to insert post:`, error.message);
      return false;
    }

    console.log(`   ✅ Post migrated successfully (ID: ${data.id})`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error migrating post:`, error);
    return false;
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║   VibeUp CMS - Supabase Migration Script      ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  // Step 1: Check if posts.json exists
  console.log('📂 Step 1: Checking for posts.json...');
  if (!existsSync(POSTS_FILE)) {
    console.error('❌ Error: posts.json not found at', POSTS_FILE);
    process.exit(1);
  }
  console.log('✅ Found posts.json\n');

  // Step 2: Create backup
  console.log('💾 Step 2: Creating backup...');
  try {
    const postsData = await readFile(POSTS_FILE, 'utf-8');
    await writeFile(BACKUP_FILE, postsData);
    console.log(`✅ Backup created: ${BACKUP_FILE}\n`);
  } catch (error) {
    console.error('❌ Failed to create backup:', error);
    process.exit(1);
  }

  // Step 3: Load posts
  console.log('📖 Step 3: Loading posts from JSON...');
  let posts: OldPost[] = [];
  try {
    const postsData = await readFile(POSTS_FILE, 'utf-8');
    posts = JSON.parse(postsData);
    console.log(`✅ Loaded ${posts.length} posts\n`);
  } catch (error) {
    console.error('❌ Failed to load posts:', error);
    process.exit(1);
  }

  if (posts.length === 0) {
    console.log('ℹ️  No posts to migrate. Exiting.');
    process.exit(0);
  }

  // Step 4: Test Supabase connection
  console.log('🔌 Step 4: Testing Supabase connection...');
  try {
    const { error } = await supabase.from('posts').select('id').limit(1);
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      console.error('\nPlease ensure:');
      console.error('  1. You have run supabase-setup.sql in your Supabase SQL editor');
      console.error('  2. The posts table exists');
      console.error('  3. Your credentials in .env.local are correct');
      process.exit(1);
    }
    console.log('✅ Supabase connection successful\n');
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error);
    process.exit(1);
  }

  // Step 5: Check storage bucket
  console.log('🪣 Step 5: Checking Supabase Storage bucket...');
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('❌ Failed to list storage buckets:', error.message);
      process.exit(1);
    }
    const bucket = data.find(b => b.name === 'blog-images');
    if (!bucket) {
      console.error('❌ Storage bucket "blog-images" not found');
      console.error('Please create it following supabase-storage-setup.md');
      process.exit(1);
    }
    console.log('✅ Storage bucket "blog-images" found\n');
  } catch (error) {
    console.error('❌ Failed to check storage bucket:', error);
    process.exit(1);
  }

  // Step 6: Migrate posts
  console.log(`🚀 Step 6: Migrating ${posts.length} posts...\n`);
  console.log('─'.repeat(50));

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`\n[${i + 1}/${posts.length}]`);
    const success = await migratePost(post);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Step 7: Summary
  console.log('\n' + '─'.repeat(50));
  console.log('\n📊 Migration Summary:');
  console.log(`   ✅ Successfully migrated: ${successCount} posts`);
  if (failCount > 0) {
    console.log(`   ❌ Failed: ${failCount} posts`);
  }
  console.log(`   💾 Backup saved to: ${BACKUP_FILE}`);

  // Step 8: Verification
  console.log('\n🔍 Step 8: Verifying migration...');
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Failed to verify:', error.message);
    } else {
      console.log(`✅ Found ${data.length} posts in Supabase:`);
      data.slice(0, 5).forEach((post, idx) => {
        console.log(`   ${idx + 1}. ${post.title}`);
      });
      if (data.length > 5) {
        console.log(`   ... and ${data.length - 5} more`);
      }
    }
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }

  console.log('\n✨ Migration complete!\n');
  console.log('Next steps:');
  console.log('  1. Test your CMS to ensure everything works');
  console.log('  2. Check that images are loading correctly');
  console.log('  3. If everything works, you can safely remove:');
  console.log('     - server/data/posts.json (backed up)');
  console.log('     - public/uploads/ directory');
  console.log('\n');
}

// Run migration
migrate().catch(error => {
  console.error('\n💥 Migration failed with error:', error);
  process.exit(1);
});

