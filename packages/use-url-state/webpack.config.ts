/// <reference types="node" />

import path from 'node:path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from '../../webpack.common';

const config = merge<Configuration>(common, {
  entry: './es/index.js',
  output: {
    filename: 'ahooks.js-use-url-state.js',
    library: 'ahooksJsUseUrlState',
    path: path.resolve(__dirname, './dist'),
  },
});

export default config;
