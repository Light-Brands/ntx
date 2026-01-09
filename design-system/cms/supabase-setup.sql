-- =====================================================
-- VibeUp CMS - Supabase Database Setup
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Location: https://app.supabase.com/project/_/sql/new
-- =====================================================

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  thumbnail_url TEXT,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Allow public read access" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON posts;

-- Create policies
-- Allow public read access (anyone can view posts)
CREATE POLICY "Allow public read access" ON posts
  FOR SELECT USING (true);

-- Allow authenticated users full access (insert, update, delete)
-- Note: Since you don't have auth set up yet, we'll allow all operations for now
-- You can modify this later when you add authentication
CREATE POLICY "Allow authenticated users full access" ON posts
  FOR ALL USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Next steps:
-- 1. Go to Storage section in Supabase Dashboard
-- 2. Create a new bucket named "blog-images"
-- 3. Set the bucket to "Public"
-- 4. Configure the storage policies (see supabase-storage-setup.md)
-- =====================================================

