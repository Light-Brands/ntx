<div align="center">

# 🚀 VibeUp CMS

### AI-Powered Blog Content Management System

*Generate stunning blog articles with AI-powered content and images in seconds*

[![Next.js](https://img.shields.io/badge/Next.js-14.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.0-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

[Demo](#) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Gemini 2.0 Flash** - Generate high-quality blog articles (800-1500 words)
- **Gemini 2.5 Flash Image** (Nano Banana) - Create stunning 16:9 thumbnails
- **Auto-save as drafts** - Generated articles instantly saved locally
- **Smart formatting** - AI creates well-structured HTML with proper headings and spacing

### ✍️ Rich Text Editing
- **WYSIWYG Editor** - Full-featured rich text editor (ReactQuill)
- **Formatting toolbar** - Headings, bold, italic, lists, links, blockquotes
- **Live preview** - See your formatted content in real-time
- **HTML support** - Properly renders and edits HTML content

### 📝 Content Management
- **Supabase integration** - Cloud database and storage (or JSON for local dev)
- **Draft & Publish workflow** - Review AI-generated content before publishing
- **Category organization** - Organize posts by categories
- **Tag system** - Add custom tags to posts
- **Search & filter** - Find posts quickly with powerful filters
- **Scalable storage** - Ready for production with Supabase

### 🎨 Beautiful UI
- **Modern design** - Clean, professional interface with gradients and animations
- **Dark mode ready** - Fully styled for dark theme
- **Responsive** - Works perfectly on desktop and mobile
- **Lottie animations** - Smooth loading states with custom animations
- **Dashboard analytics** - View stats, recent posts, and insights

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **Gemini API Key** (free from [Google AI Studio](https://aistudio.google.com/app/apikey))
- **Supabase Account** (optional, for cloud storage - free at [supabase.com](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/vibeup-org/cms.git
cd cms

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

### Configuration

Create `.env.local` in the project root:

```env
# Required: Gemini API for AI features
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supabase for cloud storage (see SUPABASE_MIGRATION_GUIDE.md)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Get your free API key: https://aistudio.google.com/app/apikey

**For Supabase setup**: See [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📖 Documentation

### 🔄 Supabase Migration

Want to move from local storage to cloud? See our comprehensive guide:

👉 **[SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)** - Complete step-by-step instructions

### Generating Articles

1. Click **"AI Generator"** in the sidebar
2. Enter your topic (50-500 characters)
3. Select a category
4. Click **"Generate with AI"**
5. Wait 20-40 seconds while AI works its magic ✨
6. Article is **automatically saved as draft**
7. View in Dashboard or click **"Edit"** to refine

### Managing Posts

- **Dashboard** - View recent posts and statistics
- **All Posts** - Browse, search, and filter all articles
- **Edit** - Use rich text editor to modify content
- **Publish** - Change status from Draft to Published
- **Delete** - Remove unwanted posts

### Editing Content

The rich text editor supports:
- **Headings** - H2, H3 for structure
- **Text formatting** - Bold, italic, underline, strikethrough
- **Lists** - Ordered and unordered lists
- **Blockquotes** - For quotes and callouts
- **Links** - Add hyperlinks
- **Code blocks** - For technical content

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | Full-stack React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Google Gemini** | AI text and image generation |
| **Supabase** | Cloud database and storage |
| **ReactQuill** | Rich text editor |
| **Lottie** | Smooth animations |
| **Sharp** | Image processing |
| **Lucide Icons** | Beautiful iconography |

---

## 📁 Project Structure

```
vibeup-cms/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── generate-text/     # AI article generation
│   │   ├── generate-image/    # AI thumbnail generation
│   │   ├── posts/             # CRUD endpoints
│   │   └── health/            # Health check
│   ├── globals.css       # Global styles & Quill styling
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main app page
├── components/
│   ├── blog/            # Blog-related components
│   │   ├── AIGenerator.tsx    # AI generation UI
│   │   ├── BlogEditor.tsx     # Rich text editor
│   │   └── BlogList.tsx       # Post listing & viewing
│   ├── dashboard/       # Dashboard components
│   ├── layout/          # Header & Sidebar
│   ├── media/           # Media library
│   ├── settings/        # Settings panel
│   └── ui/              # Reusable UI components
├── lib/
│   ├── api.ts           # API client functions
│   ├── storage.ts       # Supabase storage layer
│   ├── supabase.ts      # Supabase client config
│   └── utils.ts         # Utility functions
├── public/
│   ├── uploads/         # Legacy local images
│   └── orb-ultra-smooth.json  # Loading animation
├── scripts/
│   └── migrate-to-supabase.ts  # Migration script
├── server/
│   └── data/
│       └── posts.json   # Legacy local storage (backup)
├── supabase-setup.sql   # Database setup script
├── supabase-storage-setup.md  # Storage configuration
├── SUPABASE_MIGRATION_GUIDE.md  # Migration guide
└── types.ts             # TypeScript definitions
```

---

## 🔧 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Check API status |
| `/api/generate-text` | POST | Generate article with AI |
| `/api/generate-image` | POST | Generate thumbnail with AI |
| `/api/posts` | GET | Get all posts (with filters) |
| `/api/posts` | POST | Create new post |
| `/api/posts/[id]` | GET | Get specific post |
| `/api/posts/[id]` | PUT | Update post |
| `/api/posts/[id]` | DELETE | Delete post |

---

## 🎯 Features in Detail

### AI Article Generation
- **Topic to article** - Describe your topic, get a complete article
- **SEO-optimized** - Generated titles and summaries optimized for search
- **Proper formatting** - Articles include headings, paragraphs, lists, and quotes
- **800-1500 words** - Comprehensive, valuable content
- **Professional tone** - Engaging yet informative writing style

### AI Image Generation
- **Contextual thumbnails** - Images match your article topic
- **16:9 aspect ratio** - Perfect for blog headers
- **1920x1080 resolution** - High quality, optimized
- **Automatic processing** - Resized and compressed with Sharp
- **Photorealistic style** - Professional, eye-catching images

### Storage System
- **Supabase PostgreSQL** - Scalable cloud database
- **Supabase Storage** - CDN-backed image hosting
- **Automatic timestamps** - Created and updated tracking
- **Row Level Security** - Built-in access control
- **Migration script** - Easy migration from local JSON storage

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vibeup-org/cms)

1. Click "Deploy to Vercel"
2. Add environment variable: `GEMINI_API_KEY`
3. Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npx tsc --noEmit
```

---

## 🔒 Environment Variables

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | ✅ Yes |

Get your Gemini API key: https://aistudio.google.com/app/apikey

Get your Supabase credentials: https://app.supabase.com/project/_/settings/api

For complete setup instructions, see [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)

---

## 📝 Future Enhancements

- [x] Supabase integration for cloud storage ✅
- [ ] User authentication and multi-user support
- [ ] Image upload from device
- [ ] Advanced SEO tools
- [ ] Analytics dashboard
- [ ] Export to Markdown
- [ ] Scheduled publishing
- [ ] Custom AI prompts/templates

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** - Powering the AI generation
- **Next.js** - Amazing React framework
- **Vercel** - Hosting and deployment
- **Tailwind CSS** - Beautiful styling
- **ReactQuill** - Rich text editing

---

<div align="center">

### Made with ❤️ by [VibeUp](https://github.com/vibeup-org)

⭐ Star us on GitHub if you find this useful!

[Report Bug](https://github.com/vibeup-org/cms/issues) • [Request Feature](https://github.com/vibeup-org/cms/issues)

</div>
