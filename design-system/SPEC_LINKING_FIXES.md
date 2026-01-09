# Spec Documentation Linking Fixes

## Issues Fixed

### 1. Broken Paths in CODEX_USAGE.md

**Problem**: The `vibeup-design-spec/design/CODEX_USAGE.md` file had numerous broken path references where text merged with paths, causing links to fail.

**Examples of fixes**:
- `1../design/GUIDELINES.md` → `1. ../design/GUIDELINES.md`
- `Us../design/templates/` → `Use ../design/templates/`
- `Rea../design/tools/` → `Read ../design/tools/`
- `Referenc../design/templates/` → `Reference ../design/templates/`
- `fro../design/templates/` → `from ../design/templates/`

**Files Modified**:
- `/Users/lawl3ss/Documents/Projects/VIBEUP-v3/vibeup-design-spec/design/CODEX_USAGE.md`

### 2. Missing Spec Directory in Public Folder

**Problem**: The Vite dev server (running from `design-system-v2`) couldn't serve spec documentation because Vite only serves static files from the `public/` directory. The `spec/` directory was at the root of `design-system-v2` but not accessible to the web server.

**Solution**: Created a symlink from `public/spec` to `../spec` so Vite can properly serve all spec documentation.

**Command executed**:
```bash
cd /Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/public
ln -sf ../spec spec
```

**Result**: The spec documentation is now accessible at `http://localhost:3000/spec/*` through the dev server.

## Verification Steps

### 1. Verify CODEX_USAGE.md Paths

```bash
cd /Users/lawl3ss/Documents/Projects/VIBEUP-v3/vibeup-design-spec/design
# Check that all paths are properly formatted
grep -n "\.\./design/" CODEX_USAGE.md
```

All paths should now have proper spacing and formatting.

### 2. Verify Spec Documentation Serving

With the dev server running at `http://localhost:3000`:

1. **Navigate to Dashboard** - Should load without errors
2. **Click "Architecture" → "Data Models"** - Should load the data-models.md document
3. **Check all epic links** - Each epic should load its respective markdown file
4. **Check all architecture links**:
   - Data Models (`architecture/data-models.md`)
   - API Reference (`architecture/api-reference.md`)
   - Service Layer (`architecture/service-layer.md`)
   - AI Model Router (`architecture/ai-model-router.md`)
   - Deployment Infrastructure (`architecture/deployment-infrastructure.md`)

### 3. Verify File Accessibility

```bash
# Verify symlink exists
ls -la /Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/public/spec

# Verify architecture docs are accessible
ls -la /Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/public/spec/architecture/

# Verify epics are accessible
ls -la /Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/public/spec/epics/
```

## Directory Structure

```
VIBEUP-v3/
├── vibeup-design-spec/          # Main spec repository
│   ├── architecture/
│   │   ├── data-models.md      # ✅ Fixed - now properly linked
│   │   ├── api-reference.md
│   │   └── ...
│   ├── design/
│   │   ├── CODEX_USAGE.md      # ✅ Fixed - all paths corrected
│   │   └── ...
│   └── epics/
│       └── ...
│
└── design-system-v2/            # Design system + spec viewer
    ├── public/
    │   └── spec/ → ../spec      # ✅ New symlink for serving
    ├── spec/                    # Copy of vibeup-design-spec
    │   ├── architecture/
    │   ├── design/
    │   └── epics/
    └── pages/
        └── Showcase.tsx         # SpecDocumentView component
```

## How It Works Now

1. **Dev Server**: Runs from `design-system-v2` via Vite on port 3000
2. **Static Files**: Vite serves files from `public/` directory
3. **Spec Access**: `public/spec` symlink → `../spec` → full spec documentation
4. **Document Viewer**: `SpecDocumentView` fetches from `/spec/${filePath}`
5. **Path Resolution**: `/spec/architecture/data-models.md` → `public/spec/architecture/data-models.md` → `design-system-v2/spec/architecture/data-models.md`

## Related Files

- **Vite Config**: `/Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/vite.config.ts`
- **Showcase Page**: `/Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/pages/Showcase.tsx` (line 246: SpecDocumentView)
- **Sidebar Navigation**: `/Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/components/Sidebar.tsx`
- **Dashboard**: `/Users/lawl3ss/Documents/Projects/VIBEUP-v3/design-system-v2/pages/Dashboard.tsx`

## Future Considerations

### Option 1: Keep Current Setup (Recommended)
- Maintains clean separation between spec and design system
- Symlink ensures spec is always accessible
- Easy to update spec without touching design system

### Option 2: Move Spec to Public
- Could move entire spec directory to `public/spec/`
- Pros: No symlink needed, more explicit
- Cons: Less clear separation, harder to maintain sync

### Option 3: Dynamic Import
- Use Vite's import system to load markdown files
- Pros: More "modern", better for bundling
- Cons: Requires refactoring SpecDocumentView, may impact hot reload

## Testing Checklist

- [x] Fix all broken paths in CODEX_USAGE.md
- [x] Create symlink from public/spec to ../spec
- [x] Verify symlink is working
- [x] Verify spec files are accessible
- [ ] **User Action Required**: Test in browser that all spec documents load
- [ ] **User Action Required**: Verify internal links within spec docs work
- [ ] **User Action Required**: Check that epic navigation works correctly

## Notes

- The spec directory in `design-system-v2/spec/` appears to be a copy of `vibeup-design-spec/`
- Both files have the same line count (111 lines for data-models.md)
- The symlink approach allows the dev server to serve the documentation without modifying the Vite configuration
- All paths in CODEX_USAGE.md now use proper formatting with spaces between list numbers and paths

---

**Date**: December 22, 2025
**Fixed By**: AI Assistant (Cursor)
**Status**: ✅ Complete - Ready for user verification

