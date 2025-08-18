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
    reporters: 'verbose',
    css: {
      include: /.+/,
    },
    environment: 'jsdom',
    include: ['__tests__/**/*.spec.ts?(x)'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
    },
  },
});
