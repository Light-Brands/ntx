#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * DESIGN SYSTEM CONSISTENCY CHECKER
 * ==================================
 *
 * Lightweight script to validate new files against design system guidelines.
 *
 * Usage:
 *   node design-system/tools/check-consistency.js <file-path>
 *   node design-system/tools/check-consistency.js components/NewComponent.tsx
 *
 * Exit Codes:
 *   0 = All checks passed
 *   1 = Violations found
 *
 * @version 1.0.0
 */

const fs = require("fs");
const path = require("path");

// ANSI color codes for terminal output
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
};

// Design system rules configuration
const RULES = {
    // File naming conventions
    naming: {
        components: /^[A-Z][a-zA-Z0-9]*\.tsx$|^[a-z][a-z0-9-]*\.tsx$/,
        pages: /^page\.tsx$/,
        hooks: /^use-[a-z][a-z0-9-]*\.ts$/,
        utils: /^[a-z][a-z0-9-]*\.ts$/,
        types: /^[a-z][a-z0-9-]*\.ts$/,
        services: /^[a-z][a-z0-9-]*-service\.ts$/,
        apiRoutes: /^route\.ts$/,
    },

    // Required imports for different file types
    requiredImports: {
        component: ["React", "react"],
        page: ["useRouter", "useAuth"],
        hook: ["useState", "useEffect"],
        apiRoute: ["NextRequest", "NextResponse"],
    },

    // Anti-patterns to detect
    antiPatterns: [
        { pattern: /: any[^a-zA-Z]/, message: "Use of 'any' type detected" },
        {
            pattern: /console\.(log|error|warn|info)/,
            message: "Use unified logger instead of console",
        },
        { pattern: /style={{/, message: "Inline styles detected - use Tailwind CSS" },
        { pattern: /className="[^"]*\s{2,}/, message: "Extra whitespace in className" },
        {
            pattern: /catch\s*\(\s*\w+\s*:\s*any\s*\)/,
            message: "Catch error should be 'unknown' not 'any'",
        },
    ],

    // Required patterns for different file types
    requiredPatterns: {
        component: [
            {
                pattern: /interface\s+\w+Props/,
                message: "Component should have Props interface",
            },
        ],
        hook: [
            {
                pattern: /export\s+(function|const)\s+use[A-Z]/,
                message: "Hook must be exported and start with 'use'",
            },
        ],
        apiRoute: [
            {
                pattern: /export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)/,
                message: "API route must export HTTP method handler",
            },
            {
                pattern: /createServerSupabase/,
                message: "API route should use createServerSupabase for auth",
            },
        ],
    },
};

/**
 * Main consistency checker function
 */
function checkConsistency(filePath) {
    console.log(
        `${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`
    );
    console.log(`${colors.cyan}Design System Consistency Check${colors.reset}`);
    console.log(
        `${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`
    );

    console.log(`${colors.gray}File: ${filePath}${colors.reset}\n`);

    // Validate file exists
    if (!fs.existsSync(filePath)) {
        console.error(`${colors.red}✗ File not found: ${filePath}${colors.reset}`);
        process.exit(1);
    }

    // Read file content
    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath);
    const directory = path.dirname(filePath);

    // Determine file type
    const fileType = determineFileType(filePath, content);
    console.log(`${colors.gray}Detected Type: ${fileType}${colors.reset}\n`);

    // Run checks
    const violations = [];

    violations.push(...checkFileNaming(fileName, directory, fileType));
    violations.push(...checkAntiPatterns(content));
    violations.push(...checkRequiredPatterns(content, fileType));
    violations.push(...checkImportOrganization(content));
    violations.push(...checkDocumentation(content, fileType));
    violations.push(...checkErrorHandling(content));

    // Report results
    if (violations.length === 0) {
        console.log(`${colors.green}✓ All checks passed!${colors.reset}\n`);
        console.log(
            `${colors.gray}This file follows design system guidelines.${colors.reset}`
        );
        process.exit(0);
    } else {
        console.log(
            `${colors.red}✗ Found ${violations.length} violation(s):${colors.reset}\n`
        );
        violations.forEach((violation, index) => {
            console.log(
                `${colors.yellow}${index + 1}. ${violation.rule}${colors.reset}`
            );
            console.log(`   ${colors.gray}${violation.message}${colors.reset}`);
            if (violation.line) {
                console.log(`   ${colors.gray}Line ${violation.line}${colors.reset}`);
            }
            console.log();
        });

        console.log(
            `${colors.cyan}Fix these issues to comply with design system standards.${colors.reset}`
        );
        console.log(
            `${colors.gray}Reference: /design-system/GUIDELINES.md${colors.reset}\n`
        );
        process.exit(1);
    }
}

/**
 * Determine file type based on path and content
 */
function determineFileType(filePath, content) {
    if (filePath.includes("/components/")) return "component";
    if (filePath.includes("/hooks/")) return "hook";
    if (filePath.includes("/app/") && filePath.endsWith("page.tsx")) return "page";
    if (filePath.includes("/app/api/") && filePath.endsWith("route.ts"))
        return "apiRoute";
    if (filePath.includes("/utils/")) return "util";
    if (filePath.includes("/types/")) return "type";
    if (filePath.includes("/database/services/")) return "service";

    // Fallback: detect from content
    if (content.includes("export function") && content.includes("return ("))
        return "component";
    if (content.includes("useState") || content.includes("useEffect")) return "hook";
    if (content.includes("NextRequest") && content.includes("NextResponse"))
        return "apiRoute";

    return "unknown";
}

/**
 * Check file naming conventions
 */
function checkFileNaming(fileName, directory, fileType) {
    const violations = [];

    if (fileType === "component" && directory.includes("/components/")) {
        if (!RULES.naming.components.test(fileName)) {
            violations.push({
                rule: "File Naming",
                message: `Component files must use PascalCase or kebab-case: ${fileName}`,
            });
        }
    }

    if (fileType === "hook" && directory.includes("/hooks/")) {
        if (!RULES.naming.hooks.test(fileName)) {
            violations.push({
                rule: "File Naming",
                message: `Hook files must follow use-[name].ts pattern: ${fileName}`,
            });
        }
    }

    if (fileType === "util" && directory.includes("/utils/")) {
        if (!RULES.naming.utils.test(fileName)) {
            violations.push({
                rule: "File Naming",
                message: `Utility files must use kebab-case: ${fileName}`,
            });
        }
    }

    if (fileType === "service" && directory.includes("/database/services/")) {
        if (!RULES.naming.services.test(fileName)) {
            violations.push({
                rule: "File Naming",
                message: `Service files must end with -service.ts: ${fileName}`,
            });
        }
    }

    return violations;
}

/**
 * Check for anti-patterns
 */
function checkAntiPatterns(content) {
    const violations = [];
    const lines = content.split("\n");

    RULES.antiPatterns.forEach(({ pattern, message }) => {
        lines.forEach((line, index) => {
            if (pattern.test(line)) {
                violations.push({
                    rule: "Anti-Pattern",
                    message: message,
                    line: index + 1,
                });
            }
        });
    });

    return violations;
}

/**
 * Check required patterns for file type
 */
function checkRequiredPatterns(content, fileType) {
    const violations = [];
    const patterns = RULES.requiredPatterns[fileType] || [];

    patterns.forEach(({ pattern, message }) => {
        if (!pattern.test(content)) {
            violations.push({
                rule: "Required Pattern",
                message: message,
            });
        }
    });

    return violations;
}

/**
 * Check import organization
 */
function checkImportOrganization(content) {
    const violations = [];
    const lines = content.split("\n");

    // Find all import lines
    const importLines = lines
        .map((line, index) => ({ line, index }))
        .filter(({ line }) => line.trim().startsWith("import "));

    if (importLines.length === 0) return violations;

    // Check for relative imports when absolute should be used
    importLines.forEach(({ line, index }) => {
        if (
            line.includes("../") &&
            (line.includes("/utils/") ||
                line.includes("/components/") ||
                line.includes("/types/"))
        ) {
            violations.push({
                rule: "Import Path",
                message:
                    "Use absolute imports (@/) instead of relative paths for shared modules",
                line: index + 1,
            });
        }
    });

    return violations;
}

/**
 * Check documentation requirements
 */
function checkDocumentation(content, fileType) {
    const violations = [];

    // Check for JSDoc on exported components/functions
    if (fileType === "component" || fileType === "hook" || fileType === "util") {
        const hasJSDoc = /\/\*\*[\s\S]*?\*\//.test(content);

        if (!hasJSDoc) {
            violations.push({
                rule: "Documentation",
                message:
                    "Missing JSDoc documentation for exported functions/components",
            });
        }
    }

    // Check for Props interface documentation
    if (fileType === "component") {
        const propsInterfaceMatch = content.match(
            /interface\s+\w+Props\s*{([\s\S]*?)}/
        );

        if (propsInterfaceMatch) {
            const propsBody = propsInterfaceMatch[1];
            const propLines = propsBody
                .split("\n")
                .filter((line) => line.includes(":"));

            propLines.forEach((line) => {
                if (!line.includes("/**") && !line.includes("//")) {
                    violations.push({
                        rule: "Documentation",
                        message:
                            "Props interface properties should have JSDoc comments",
                    });
                }
            });
        }
    }

    return violations;
}

/**
 * Check error handling patterns
 */
function checkErrorHandling(content) {
    const violations = [];

    // Check for async functions without try-catch
    const asyncFunctions =
        content.match(
            /async\s+function\s+\w+[\s\S]*?{([\s\S]*?)(?=\n\s*(?:async\s+function|function|export|$))/g
        ) || [];

    asyncFunctions.forEach((func) => {
        if (!func.includes("try") || !func.includes("catch")) {
            violations.push({
                rule: "Error Handling",
                message: "Async functions should have try-catch blocks",
            });
        }
    });

    // Check for proper error logging
    const catchBlocks = content.match(/catch\s*\([^)]+\)\s*{[^}]*}/g) || [];

    catchBlocks.forEach((block) => {
        if (!block.includes("logger")) {
            violations.push({
                rule: "Error Handling",
                message: "Catch blocks should log errors using unified logger",
            });
        }
    });

    return violations;
}

/**
 * CLI Entry Point
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(`${colors.cyan}Design System Consistency Checker${colors.reset}\n`);
        console.log(
            "Usage: node design-system/tools/check-consistency.js <file-path>\n"
        );
        console.log("Examples:");
        console.log(
            "  node design-system/tools/check-consistency.js components/NewCard.tsx"
        );
        console.log(
            "  node design-system/tools/check-consistency.js app/api/users/route.ts"
        );
        console.log(
            "  node design-system/tools/check-consistency.js hooks/use-auth-state.ts\n"
        );
        process.exit(0);
    }

    const filePath = args[0];
    checkConsistency(filePath);
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { checkConsistency, determineFileType };
