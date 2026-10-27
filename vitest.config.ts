import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      // Logic modules (SEO, routing, project data helpers). Visual pages are verified by the build and visual review.
      include: [
        'src/config/**',
        'src/i18n/metadata.ts',
        'src/i18n/messages.ts',
        'src/app/sitemap.ts',
        'src/lib/links.ts',
        'src/lib/projectsData.ts',
        'src/lib/projectTranslations/index.ts',
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
