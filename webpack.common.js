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
        exclude: (name) =>
          /node_modules/.test(name) && !/node_modules\/(query-string|filter-obj)/.test(name),
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
