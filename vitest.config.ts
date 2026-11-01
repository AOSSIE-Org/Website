import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    // Page tests render every project card, and property tests render a component many times
    testTimeout: 60_000,
    // Clear mock call history before each test; mock implementations stay in place
    clearMocks: true,
    // next-intl imports `next/navigation` without an extension; bundling it lets Vite resolve that
    // import and lets the test setup replace it
    server: { deps: { inline: ['next-intl'] } },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      // The whole application: every page, layout, component, hook, config and helper under src/
      include: ['src/**/*.{ts,tsx}'],
      // Only files with no runtime code to test are left out
      exclude: [
        'src/__tests__/**', // the tests themselves and their shared mocks
        'src/**/*.d.ts', // ambient type declarations (src/types/)
        'src/lib/projectTranslations/types.ts', // a type alias only; compiles to an empty module
      ],
      thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
