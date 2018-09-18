const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
      rules: [
          {
              test: /\.jsx/,
              use: {
                  loader: 'babel-loader',
                  options: { presets: ['react', 'es2015'] }
              }
          },
          {
              test: /\.scss/,
              use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
              test: /\.(png|jpg|gif)$/,
              use: [
                  {
                      loader: 'file-loader',
                      options: {}
                  }
              ]
          }
      ]
  }
};
