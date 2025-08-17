module.exports = {
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js'],
  },
  // Rspack 兼容 webpack 的 externals 配置
  externals: [
    {
      react: 'React',
    },
  ],
};
