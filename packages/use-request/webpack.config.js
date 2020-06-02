const merge = require('webpack-merge');
const common = require('../../webpack.common.js')
const path = require('path');

module.exports = merge(common, {
  entry: './src/index.ts',
  output: {
    filename: 'ahooks-use-request.js',
    library: 'ahooksUseRequest',
    path: path.resolve(__dirname, './dist'),
  }
})
