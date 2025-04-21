import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', '.git', 'dist'],
    globals: true,
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/'],
    },
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // Configure different test pools for different types of tests
    pool: 'forks', // Default pool for unit and integration tests
    poolOptions: {
      forks: {
        // Options for the default pool
        isolate: true,
      },
      'cloudflare-workers': {
        // Options for E2E tests using Cloudflare Workers
        isolate: true,
      },
    },
    // Configure timeouts
    testTimeout: 10000, // 10 seconds for most tests
    hookTimeout: 10000,
    // Configure retry options
    retry: 1, // Retry failed tests once
  },
});