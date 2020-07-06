const merge = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'ahooks-use-local-storage-state.js',
    library: 'ahooksUseLocalStorageState',
    path: path.resolve(__dirname, './dist'),
  },
});
