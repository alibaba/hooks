const path = require('node:path');
const common = require('../../rspack.common');

module.exports = {
  ...common,
  entry: './es/index.js',
  output: {
    ...(common.output || {}),
    filename: 'ahooks.js',
    library: 'ahooks',
    path: path.resolve(__dirname, './dist'),
  },
};
