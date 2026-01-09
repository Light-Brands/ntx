# 🚀 Quick Start - Supabase Integration

Your CMS has been migrated to Supabase! Follow these steps to complete the setup.

## ⚡ 5-Minute Setup

### 1️⃣ Add Credentials (1 min)

Edit `.env.local` and add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

Get these from: https://app.supabase.com → Your Project → Settings → API

### 2️⃣ Setup Database (2 min)

1. Go to: https://app.supabase.com → SQL Editor
2. Copy contents of `supabase-setup.sql`
3. Paste and click **Run**

### 3️⃣ Setup Storage (1 min)

1. Go to: https://app.supabase.com → Storage
2. Click **New bucket**
3. Name: `blog-images`, Check **Public**, Create
4. In bucket → Policies → New Policy → Use SQL:
```sql
CREATE POLICY "Allow all operations"
ON storage.objects FOR ALL
USING (bucket_id = 'blog-images')
WITH CHECK (bucket_id = 'blog-images');
```

### 4️⃣ Run Migration (1 min)

```bash
npm run migrate
```

### 5️⃣ Test (30 sec)

```bash
npm run dev
```

Open http://localhost:3000 and verify posts & images load!

## ✅ Done!

Your CMS is now powered by Supabase! 🎉

---

**Need more details?** See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

**Full guide?** See [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)

