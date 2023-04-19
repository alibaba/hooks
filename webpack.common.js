module.exports = {
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // https://github.com/alibaba/hooks/issues/2155
        include: /node_modules\/(query-string|filter-obj)/,
        use: {
          loader: 'babel-loader',
          options: require('./.babel.config.json'),
        },
      },
    ],
  },
  externals: [
    {
      react: 'React',
    },
  ],
};
