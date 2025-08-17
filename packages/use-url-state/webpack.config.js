const { merge } = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('node:path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'ahooks-use-url-state.js',
    library: 'ahooksUseUrlState',
    path: path.resolve(__dirname, './dist'),
  },
});
