import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
    tsconfigPath: './tsconfig.build.json',
  },
  lib: [
    {
      format: 'umd',
      umdName: 'ahooksUseUrlState',
      output: {
        target: 'web',
        externals: {
          react: 'React',
        },
        filename: {
          js: (pathData) => {
            return pathData.chunk?.name === 'index'
              ? 'ahooks-use-url-state.js'
              : `ahooks-use-url-state.chunk-${pathData.chunk?.name}.js`;
          },
        },
        minify: true,
      },
    },
    {
      format: 'esm',
      dts: true,
      output: {
        target: 'web',
        sourceMap: true,
      },
    },
    {
      format: 'cjs',
      output: {
        sourceMap: true,
      },
    },
  ],
});
