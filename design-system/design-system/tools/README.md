# Design System Enforcement Tools

**Purpose:** Automated tools to enforce design system consistency across the VIBEUP
codebase.

**Created:** 2025-12-12 **Version:** 1.0.0

---

## 📋 Contents

This directory contains tools to help maintain design system consistency:

1. **cursor-prompt-base.txt** - AI agent prompt prefix
2. **lint-rules.md** - ESLint/TypeScript rule recommendations
3. **check-consistency.js** - Automated consistency checker
4. **README.md** - This file

---

## 🤖 cursor-prompt-base.txt

### Purpose

Reusable prompt prefix that all AI agents (Cursor AI, GitHub Copilot, etc.) should use
when implementing features.

### Usage

**For AI Agents:**

```
Before implementing any feature, read this file and follow all rules strictly.
```

**For Developers:**

```
Copy and paste into AI prompts:
"Follow the instructions in /design-system/tools/cursor-prompt-base.txt"
```

### What It Enforces

- Component naming conventions
- Props interface patterns
- Styling with Tailwind CSS
- Error handling standards
- Type safety (no 'any')
- Logging with unified logger
- Import organization
- Documentation requirements

### Example Usage

```
User: "Create a new UserProfileCard component"

AI Agent:
1. Read /design-system/tools/cursor-prompt-base.txt
2. Read /design-system/templates/component-template.tsx
3. Read /design-system/GUIDELINES.md
4. Implement following all patterns
```

---

## 📐 lint-rules.md

### Purpose

Documents recommended ESLint and TypeScript rules to enforce design system consistency
through automated linting.

### Structure

- **Current Rules:** Active rules in `.eslintrc.json`
- **Recommended Additions:** 10 new rules to implement
- **Custom Rules:** Implementation for project-specific patterns
- **Implementation Guide:** Step-by-step setup instructions
- **Migration Strategy:** How to enable rules incrementally

### Key Rules

#### Phase 1 (High Priority)

1. `no-console` - Enforce unified logger
2. `require-error-handling` - Require try-catch in async functions
3. `require-unified-logger` - Custom rule to prevent console usage

#### Phase 2 (Medium Priority)

4. `@typescript-eslint/naming-convention` - Enforce naming standards
5. `import/order` - Organize imports properly
6. `require-typed-props` - Type all component props

#### Phase 3 (Nice-to-Have)

7. `jsdoc/require-jsdoc` - Require documentation
8. `react/forbid-dom-props` - No inline styles
9. `enforce-file-naming` - File naming conventions
10. `no-restricted-imports` - Use absolute imports

### Implementation Steps

```bash
# 1. Install required plugins
npm install --save-dev eslint-plugin-import eslint-plugin-jsdoc

# 2. Create custom rules directory
mkdir -p .eslint/rules

# 3. Add custom rule files (see lint-rules.md for implementations)

# 4. Update .eslintrc.json with new rules

# 5. Test rules
npx eslint . --rule 'no-console: error'

# 6. Fix violations
npm run lint -- --fix
```

### Testing Individual Rules

```bash
# Test naming conventions
npx eslint --rule '@typescript-eslint/naming-convention: error' components/

# Test import order
npx eslint --rule 'import/order: error' app/

# Test no console
npx eslint --rule 'no-console: error' .
```

---

## 🔍 check-consistency.js

### Purpose

Lightweight Node.js script that checks new files for design system violations before
they're committed.

### Features

- ✅ File naming convention validation
- ✅ Anti-pattern detection (any, console.log, inline styles)
- ✅ Required pattern checking (Props interface, JSDoc, etc.)
- ✅ Import organization validation
- ✅ Documentation requirements
- ✅ Error handling patterns
- ✅ Colored terminal output
- ✅ Actionable error messages

### Usage

**Basic:**

```bash
node design-system/tools/check-consistency.js <file-path>
```

**Examples:**

```bash
# Check a component
node design-system/tools/check-consistency.js components/CommunityCard.tsx

# Check a page
node design-system/tools/check-consistency.js app/community/discover/page.tsx

# Check a hook
node design-system/tools/check-consistency.js hooks/use-auth-state.ts

# Check an API route
node design-system/tools/check-consistency.js app/api/users/route.ts

# Check a utility
node design-system/tools/check-consistency.js utils/general-utils/format-date.ts
```

### What It Checks

#### 1. File Naming

- Components: PascalCase or kebab-case
- Hooks: `use-[name].ts`
- Utils: kebab-case
- Services: `[name]-service.ts`
- API Routes: `route.ts`

#### 2. Anti-Patterns

- ❌ `any` type usage
- ❌ `console.log` / `console.error`
- ❌ Inline styles (`style={{}}`)
- ❌ Extra whitespace in className
- ❌ `catch (error: any)`

#### 3. Required Patterns

- ✅ Components have Props interface
- ✅ Hooks start with `use` and are exported
- ✅ API routes export HTTP method handlers
- ✅ API routes use `createServerSupabase`

#### 4. Import Organization

- ✅ Absolute imports for shared modules
- ✅ No relative paths for `/utils/`, `/components/`, `/types/`

#### 5. Documentation

- ✅ JSDoc comments on exports
- ✅ Props interface properties documented

#### 6. Error Handling

- ✅ Async functions have try-catch
- ✅ Catch blocks use unified logger

### Sample Output

**✅ Success:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design System Consistency Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/CommunityCard.tsx

Detected Type: component

✓ All checks passed!

This file follows design system guidelines.
```

**❌ Violations:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design System Consistency Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/NewCard.tsx

Detected Type: component

✗ Found 3 violation(s):

1. Anti-Pattern
   Use unified logger instead of console
   Line 42

2. Anti-Pattern
   Use of 'any' type detected
   Line 58

3. Documentation
   Missing JSDoc documentation for exported functions/components

Fix these issues to comply with design system standards.
Reference: /design-system/GUIDELINES.md
```

### Integration with Git Hooks

Add to `package.json` scripts:

```json
{
  "scripts": {
    "check-design": "node design-system/tools/check-consistency.js"
  }
}
```

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Check staged files against design system
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

for FILE in $STAGED_FILES; do
  echo "Checking $FILE..."
  node design-system/tools/check-consistency.js "$FILE"

  if [ $? -ne 0 ]; then
    echo "❌ Design system check failed for $FILE"
    exit 1
  fi
done

echo "✅ All files pass design system checks"
```

### CI/CD Integration

Add to GitHub Actions workflow:

```yaml
- name: Check Design System Consistency
  run: |
    for file in $(git diff --name-only origin/main...HEAD | grep -E '\.(ts|tsx)$'); do
      node design-system/tools/check-consistency.js "$file"
    done
```

---

## 🚀 Quick Start Guide

### For New Features

1. **Before Starting:**

   ```bash
   # Read the AI prompt base
   cat design-system/tools/cursor-prompt-base.txt

   # Review guidelines
   cat design-system/GUIDELINES.md
   ```

2. **During Development:**

   ```bash
   # Check your file frequently
   node design-system/tools/check-consistency.js your-new-file.tsx
   ```

3. **Before Committing:**

   ```bash
   # Final check
   node design-system/tools/check-consistency.js your-new-file.tsx

   # Run linter
   npm run lint

   # Run type check
   npm run type-check
   ```

### For AI Agents

**Prompt Template:**

```
I'm implementing [feature name].

INSTRUCTIONS:
1. Read /design-system/tools/cursor-prompt-base.txt
2. Follow all design system rules strictly
3. Use appropriate template from /design-system/templates/
4. After implementation, run:
   node design-system/tools/check-consistency.js [file-path]

[Your feature description here]
```

---

## 📊 Metrics & Monitoring

### Track Compliance

```bash
# Check multiple files
for file in components/*.tsx; do
  node design-system/tools/check-consistency.js "$file"
done

# Generate compliance report
node design-system/tools/check-consistency.js components/*.tsx 2>&1 | tee compliance-report.txt
```

### Violation Statistics

```bash
# Count violations by type
grep "Anti-Pattern" compliance-report.txt | wc -l
grep "Documentation" compliance-report.txt | wc -l
grep "File Naming" compliance-report.txt | wc -l
```

---

## 🛠️ Maintenance

### Updating Rules

1. **Add New Check:**

   ```javascript
   // Edit check-consistency.js
   function checkNewPattern(content) {
     const violations = [];
     // Add check logic
     return violations;
   }

   // Add to main checker
   violations.push(...checkNewPattern(content));
   ```

2. **Test New Check:**

   ```bash
   node design-system/tools/check-consistency.js test-file.tsx
   ```

3. **Document in lint-rules.md:**
   - Add rule description
   - Add implementation example
   - Update priority phase

### Version Updates

When updating design system guidelines:

1. Update `GUIDELINES.md`
2. Update `cursor-prompt-base.txt` with new rules
3. Update `lint-rules.md` with new lint rules
4. Update `check-consistency.js` with new checks
5. Update version numbers in all files
6. Communicate changes to team

---

## 📚 Related Documentation

- [Design System README](../README.md)
- [CODEX Usage Guide](../CODEX_USAGE.md)
- [Design System Guidelines](../GUIDELINES.md)
- [Component Template](../templates/component-template.tsx)
- [Page Template](../templates/page-template.tsx)
- [Hook Template](../templates/hook-template.ts)
- [Existing Patterns](../existing-patterns.json)

---

## 🤝 Contributing

### Adding New Rules

1. Identify pattern that needs enforcement
2. Add to `check-consistency.js` if runtime check
3. Add to `lint-rules.md` if ESLint rule
4. Update `cursor-prompt-base.txt` with guidance
5. Test on existing codebase
6. Document in this README
7. Submit PR

### Feedback

Found an issue or have a suggestion?

1. Check existing files match design system
2. Review GUIDELINES.md for clarity
3. Test check-consistency.js accuracy
4. Propose improvements via PR
5. Update documentation

---

## 📝 Changelog

### Version 1.0.0 (2025-12-12)

- ✅ Initial release
- ✅ Created cursor-prompt-base.txt
- ✅ Created lint-rules.md with 10 recommended rules
- ✅ Created check-consistency.js with 6 check categories
- ✅ Documentation complete

---

## 🎯 Goals

### Short-term

- [x] Create enforcement tools
- [x] Document lint rules
- [x] Automated consistency checker
- [ ] Integrate with pre-commit hooks
- [ ] Enable Phase 1 lint rules

### Medium-term

- [ ] Enable Phase 2 lint rules
- [ ] Track compliance metrics
- [ ] Generate compliance dashboard
- [ ] Add more custom rules

### Long-term

- [ ] 100% design system compliance
- [ ] Zero manual review needed
- [ ] Automated fixes for common issues
- [ ] AI agent full autonomy

---

**Maintainer:** VIBEUP Development Team **Contact:** See project README **License:** See
project LICENSE
