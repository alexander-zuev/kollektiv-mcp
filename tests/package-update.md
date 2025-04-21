# Package.json Updates for Testing

To implement the testing strategy, the following updates to `package.json` are recommended:

## Test Scripts

Add these scripts to the `scripts` section of `package.json`:

```json
"scripts": {
  // ... existing scripts
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui",
  "test:unit": "vitest run tests/unit",
  "test:integration": "vitest run tests/integration",
  "test:e2e": "vitest run tests/e2e"
}
```

## Testing Dependencies

Add these dependencies to the `devDependencies` section of `package.json`:

```json
"devDependencies": {
  // ... existing devDependencies
  "vitest": "^1.2.1",
  "@vitest/coverage-v8": "^1.2.1",
  "@vitest/ui": "^1.2.1",
  "msw": "^2.1.5",
  "@cloudflare/vitest-pool-workers": "^0.1.0",
  "@testing-library/dom": "^9.3.4"
}
```

## Vitest Configuration

Create a `vitest.config.ts` file in the project root with the following content:

```typescript
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
  },
});
```

## Test Setup File

Create a `tests/setup.ts` file with the following content:

```typescript
import { vi } from 'vitest';

// Mock global fetch
global.fetch = vi.fn();

// Mock Cloudflare environment
vi.mock('hono/adapter', () => ({
  env: vi.fn().mockImplementation((c) => ({
    OAUTH_KV: {
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
    // Add other environment variables as needed
  })),
}));

// Reset mocks before each test
beforeEach(() => {
  vi.resetAllMocks();
});
```

## GitHub Actions Workflow

Create a `.github/workflows/test.yml` file with the following content:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

## Implementation Steps

1. Update `package.json` with the test scripts and dependencies
2. Create the `vitest.config.ts` file
3. Create the `tests/setup.ts` file
4. Create the GitHub Actions workflow file
5. Run `npm install` to install the new dependencies
6. Run `npm run test` to verify the setup