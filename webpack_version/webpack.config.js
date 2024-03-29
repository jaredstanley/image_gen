// webpack.config.js
module.exports = {
  entry: './js/script.js',
  output: {
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  node: {
  fs: 'empty'
  }
};
