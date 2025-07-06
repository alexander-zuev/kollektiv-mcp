/// <reference types="vitest/config" />

import {defineWorkersConfig} from "@cloudflare/vitest-pool-workers/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineWorkersConfig({
    plugins: [
        tsconfigPaths({
            projects: ["./tsconfig.json"],
        }),
    ],
    test: {
        globals: true,
        deps: {
            optimizer: {
                ssr: {
                    enabled: true,
                    include: [
                        "@supabase/supabase-js",
                        "@supabase/ssr",
                        "snakecase-keys",
                        "camelcase-keys",
                        "ajv",
                    ],
                    exclude: [
                        'chai', // Exclude chai from SSR optimization
                    ],
                },
            },
        },
        poolOptions: {
            workers: {
                wrangler: {
                    configPath: "./wrangler.jsonc",
                },
            },
        },
        reporters: ["dot"],
        coverage: {
            provider: "istanbul", // or 'v8'
            // Reporters: 'text' for terminal, 'json' for CI tools, 'html' for detailed local reports
            reporter: ["text", "json", "html"],

            include: ["src/**/*.ts"],

            // Exclude test files, setup files, type definitions, and potentially other irrelevant files
            exclude: [
                "**/*.test.ts", // Test files
                "**/*.spec.ts", // Spec files (alternative naming)
                "tests/**/*", // All files within the tests directory
                "**/node_modules/**", // Node modules
                "**/dist/**", // Build output
                "**/*.d.ts", // TypeScript definition files
                "vitest.config.ts", // This config file
                "wrangler.jsonc", // Wrangler config
            ],
        },

        // --- Workspace definition ---
        workspace: [
            {
                // --- Unit Test Project ---
                extends: true, // Inherit global settings (plugins, poolOptions, deps)
                test: {
                    name: "unit",
                    include: ["tests/unit/**/*.test.ts"],
                    setupFiles: ["./tests/unit/setup.ts"],
                },
            },
            {
                // --- Integration Test Project ---
                extends: true, // Inherit global settings
                test: {
                    name: "integration",
                    include: ["tests/integration/**/*.test.ts"],
                    setupFiles: ["./tests/integration/setup.ts"],
                },
            },
            {
                // --- E2E Test Project ---
                extends: true, // Inherit global settings
                test: {
                    name: "e2e",
                    include: ["tests/e2e/**/*.test.ts"],
                    setupFiles: ["./tests/e2e/setup.ts"],
                },
            },
        ],
    },
});