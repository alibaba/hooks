import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// https://cn.vitest.dev/guide/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/__tests__/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['src/useRequest/__tests__/**'],
    testTimeout: 15000,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
});
