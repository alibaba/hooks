const merge = require('webpack-merge');
const common = require('../../webpack.common.js')
const path = require('path');

module.exports = merge(common, {
  entry: './src/index.ts',
  output: {
    filename: 'umi-hooks-use-request.js',
    library: 'umiHooksUseRequest',
    path: path.resolve(__dirname, './dist'),
  }
})
