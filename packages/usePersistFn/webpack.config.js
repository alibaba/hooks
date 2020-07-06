const merge = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'ahooks-use-persist-fn.js',
    library: 'ahooksUsePersistFn',
    path: path.resolve(__dirname, './dist'),
  },
});
