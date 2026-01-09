# ESLint & TypeScript Rules for Design System Enforcement

**Purpose:** Enforce design system consistency through automated linting rules.

**Current Status:** Recommendations for future implementation.

**Last Updated:** 2025-12-12

---

## Current Rules (Active)

These rules are already enforced in `.eslintrc.json`:

```json
{
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/array-type": ["error", { "default": "array" }],
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
  "prefer-const": "error",
  "no-var": "error"
}
```

---

## Recommended Additions

### 1. Naming Convention Enforcement

**Rule:** `@typescript-eslint/naming-convention`

**Configuration:**

```json
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "interface",
      "format": ["PascalCase"],
      "custom": {
        "regex": "^[A-Z][a-zA-Z0-9]*Props$",
        "match": true
      },
      "suffix": ["Props"]
    },
    {
      "selector": "typeAlias",
      "format": ["PascalCase"]
    },
    {
      "selector": "function",
      "format": ["camelCase", "PascalCase"],
      "leadingUnderscore": "forbid",
      "trailingUnderscore": "forbid"
    },
    {
      "selector": "variable",
      "format": ["camelCase", "UPPER_CASE", "PascalCase"],
      "leadingUnderscore": "allow",
      "trailingUnderscore": "forbid"
    },
    {
      "selector": "parameter",
      "format": ["camelCase"],
      "leadingUnderscore": "allow"
    },
    {
      "selector": "class",
      "format": ["PascalCase"],
      "suffix": ["Service", "Error", "Manager", "Provider", "Handler", "Adapter"]
    }
  ]
}
```

**Enforces:**

- Component props interfaces end with "Props"
- Functions use camelCase (except React components)
- Classes use PascalCase with semantic suffixes
- No leading/trailing underscores on functions

---

### 2. Import Organization

**Rule:** `import/order` (requires eslint-plugin-import)

**Configuration:**

```json
{
  "import/order": [
    "error",
    {
      "groups": [
        "builtin",
        "external",
        "internal",
        ["parent", "sibling"],
        "index",
        "type"
      ],
      "pathGroups": [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        },
        {
          "pattern": "@/types/**",
          "group": "type",
          "position": "after"
        },
        {
          "pattern": "@/lib/**",
          "group": "internal",
          "position": "before"
        },
        {
          "pattern": "@/utils/**",
          "group": "internal"
        },
        {
          "pattern": "@/components/**",
          "group": "internal",
          "position": "after"
        }
      ],
      "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }
  ]
}
```

**Enforces:** External → Types → Internal → Feature (design system standard)

---

### 3. No Console Statements

**Rule:** `no-console`

**Configuration:**

```json
{
  "no-console": [
    "error",
    {
      "allow": []
    }
  ]
}
```

**Enforces:** Use unified logger instead of console.log/error/warn

---

### 4. Props Documentation

**Rule:** `jsdoc/require-jsdoc` (requires eslint-plugin-jsdoc)

**Configuration:**

```json
{
  "jsdoc/require-jsdoc": [
    "error",
    {
      "publicOnly": true,
      "require": {
        "FunctionDeclaration": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": false,
        "FunctionExpression": false
      },
      "contexts": ["TSInterfaceDeclaration"]
    }
  ],
  "jsdoc/require-param-description": "error",
  "jsdoc/require-returns-description": "error"
}
```

**Enforces:** JSDoc comments on exported functions and interfaces

---

### 5. Error Handling

**Rule:** Custom rule `require-error-handling`

**Configuration:**

```json
{
  "require-error-handling": "error"
}
```

**Custom Rule Implementation:**

```javascript
// .eslint/rules/require-error-handling.js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require try-catch blocks for async functions",
      category: "Best Practices",
    },
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (node.async && !hasTryCatch(node.body)) {
          context.report({
            node,
            message: "Async functions must have try-catch error handling",
          });
        }
      },
    };
  },
};

function hasTryCatch(body) {
  return body.body.some((statement) => statement.type === "TryStatement");
}
```

**Enforces:** All async functions have try-catch blocks

---

### 6. Component Props Type Safety

**Rule:** Custom rule `require-typed-props`

**Configuration:**

```json
{
  "require-typed-props": "error"
}
```

**Custom Rule Implementation:**

```javascript
// .eslint/rules/require-typed-props.js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require explicit type annotations for component props",
      category: "TypeScript",
    },
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (isReactComponent(node) && !hasPropsInterface(node)) {
          context.report({
            node,
            message: "React components must have a typed Props interface",
          });
        }
      },
    };
  },
};

function isReactComponent(node) {
  return /^[A-Z]/.test(node.id.name) && node.params.length > 0;
}

function hasPropsInterface(node) {
  const param = node.params[0];
  return param.typeAnnotation !== undefined;
}
```

**Enforces:** All React components have typed props

---

### 7. Prevent Inline Styles

**Rule:** `react/forbid-dom-props`

**Configuration:**

```json
{
  "react/forbid-dom-props": [
    "error",
    {
      "forbid": [
        {
          "propName": "style",
          "message": "Use Tailwind CSS classes instead of inline styles"
        }
      ]
    }
  ]
}
```

**Enforces:** No inline style props (use Tailwind instead)

---

### 8. File Naming Convention

**Rule:** Custom rule `enforce-file-naming`

**Configuration:**

```json
{
  "enforce-file-naming": [
    "error",
    {
      "components": "PascalCase|kebab-case",
      "pages": "kebab-case",
      "hooks": "kebab-case",
      "utils": "kebab-case",
      "types": "kebab-case"
    }
  ]
}
```

**Custom Rule Implementation:**

```javascript
// .eslint/rules/enforce-file-naming.js
const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce design system file naming conventions",
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();
        const basename = path.basename(filename, path.extname(filename));
        const directory = path.dirname(filename);

        if (directory.includes("/components/")) {
          if (!isPascalCase(basename) && !isKebabCase(basename)) {
            context.report({
              node,
              message: `Component files must use PascalCase or kebab-case: ${basename}`,
            });
          }
        }

        if (directory.includes("/hooks/")) {
          if (!basename.startsWith("use-") || !isKebabCase(basename)) {
            context.report({
              node,
              message: `Hook files must start with 'use-' and use kebab-case: ${basename}`,
            });
          }
        }

        if (directory.includes("/utils/")) {
          if (!isKebabCase(basename)) {
            context.report({
              node,
              message: `Utility files must use kebab-case: ${basename}`,
            });
          }
        }
      },
    };
  },
};

function isPascalCase(str) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

function isKebabCase(str) {
  return /^[a-z][a-z0-9-]*$/.test(str);
}
```

**Enforces:** File naming conventions per directory

---

### 9. Import Path Restrictions

**Rule:** `no-restricted-imports`

**Configuration:**

```json
{
  "no-restricted-imports": [
    "error",
    {
      "patterns": [
        {
          "group": ["../**/utils/*"],
          "message": "Import from @/utils/* instead of relative paths"
        },
        {
          "group": ["../**/components/*"],
          "message": "Import from @/components/* instead of relative paths"
        },
        {
          "group": ["../**/types/*"],
          "message": "Import from @/types/* instead of relative paths"
        }
      ]
    }
  ]
}
```

**Enforces:** Use absolute imports (@/) instead of relative imports

---

### 10. Logger Usage

**Rule:** Custom rule `require-unified-logger`

**Configuration:**

```json
{
  "require-unified-logger": "error"
}
```

**Custom Rule Implementation:**

```javascript
// .eslint/rules/require-unified-logger.js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require unified logger instead of console",
    },
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.name === "console" &&
          ["log", "error", "warn", "info", "debug"].includes(node.property.name)
        ) {
          context.report({
            node,
            message: "Use logger from @/utils/unified-logger instead of console",
          });
        }
      },
    };
  },
};
```

**Enforces:** Use unified logger, not console

---

## Implementation Priority

### Phase 1: High-Priority (Implement First)

1. ✅ `@typescript-eslint/no-explicit-any` (already active)
2. ✅ `@typescript-eslint/no-unused-vars` (already active)
3. 🔲 `no-console` - Enforce unified logger
4. 🔲 `require-error-handling` - Require try-catch
5. 🔲 `require-unified-logger` - Prevent console usage

### Phase 2: Medium-Priority

6. 🔲 `@typescript-eslint/naming-convention` - Naming standards
7. 🔲 `import/order` - Import organization
8. 🔲 `require-typed-props` - Type all props

### Phase 3: Nice-to-Have

9. 🔲 `jsdoc/require-jsdoc` - Documentation
10. 🔲 `react/forbid-dom-props` - No inline styles
11. 🔲 `enforce-file-naming` - File naming
12. 🔲 `no-restricted-imports` - Import paths

---

## Installation Steps

### 1. Install Required Plugins

```bash
npm install --save-dev \
  eslint-plugin-import \
  eslint-plugin-jsdoc \
  @typescript-eslint/eslint-plugin@latest \
  @typescript-eslint/parser@latest
```

### 2. Create Custom Rules Directory

```bash
mkdir -p .eslint/rules
```

### 3. Add Custom Rules

Place custom rule files in `.eslint/rules/`:

- `require-error-handling.js`
- `require-typed-props.js`
- `enforce-file-naming.js`
- `require-unified-logger.js`

### 4. Update .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "import", "jsdoc"],
  "rules": {
    // Existing rules...

    // New Phase 1 rules
    "no-console": ["error", { "allow": [] }],
    "require-error-handling": "error",
    "require-unified-logger": "error"
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  }
}
```

### 5. Load Custom Rules

Create `.eslintrc.js` to load custom rules:

```javascript
module.exports = {
  ...require("./.eslintrc.json"),
  plugins: [...require("./.eslintrc.json").plugins, "local-rules"],
  rules: {
    ...require("./.eslintrc.json").rules,
    "local-rules/require-error-handling": "error",
    "local-rules/require-typed-props": "error",
    "local-rules/enforce-file-naming": "error",
    "local-rules/require-unified-logger": "error",
  },
};
```

---

## Testing Rules

### Test Individual Rules

```bash
# Test naming conventions
npx eslint --rule '@typescript-eslint/naming-convention: error' components/

# Test import order
npx eslint --rule 'import/order: error' app/

# Test no console
npx eslint --rule 'no-console: error' .
```

### Run Full Validation

```bash
# Lint all files
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check specific directory
npx eslint app/api/
```

---

## Migration Strategy

### Step 1: Audit Current Violations

```bash
# Generate violation report
npx eslint . --format json > lint-violations.json

# Count violations by rule
node scripts/analyze-lint-violations.js
```

### Step 2: Enable Rules Gradually

Enable rules one at a time, fix violations, commit:

```bash
# Enable one rule in .eslintrc.json
git checkout -b lint/enable-no-console

# Fix violations
npm run lint -- --fix

# Manual fixes
# ... fix remaining issues

# Commit
git commit -am "Enable no-console rule"
git push origin lint/enable-no-console
```

### Step 3: Pre-commit Hook

Add to `.lintstagedrc.json`:

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

---

## Continuous Improvement

### Add Rules Iteratively

- Enable 1-2 rules per week
- Fix violations before enabling next rule
- Document exceptions in code comments

### Monitor Rule Effectiveness

- Track violation counts over time
- Review false positives
- Adjust rule configurations as needed

### Team Education

- Share rule documentation
- Code review checklist includes design system compliance
- Pair programming sessions for onboarding

---

## Resources

- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [ESLint Core Rules](https://eslint.org/docs/latest/rules/)
- [ESLint Plugin Import](https://github.com/import-js/eslint-plugin-import)
- [ESLint Plugin JSDoc](https://github.com/gajus/eslint-plugin-jsdoc)
- [Writing Custom ESLint Rules](https://eslint.org/docs/latest/developer-guide/working-with-rules)

---

**Version:** 1.0.0 **Maintainer:** VIBEUP Development Team **Last Updated:** 2025-12-12
