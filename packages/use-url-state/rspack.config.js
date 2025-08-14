const path = require('node:path');
const common = require('../../rspack.common');

module.exports = {
  ...common,
  entry: './es/index.js',
  output: {
    ...(common.output || {}),
    filename: 'ahooks-use-url-state.js',
    library: 'ahooksUseUrlState',
    path: path.resolve(__dirname, './dist'),
  },
};
