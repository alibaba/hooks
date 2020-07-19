const path = require('path');
const merge = require('webpack-merge');
const common = require('../../webpack.common.js');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'ahooks-use-table.js',
    library: 'ahooksUseTable',
    path: path.resolve(__dirname, './dist'),
  },
});
