const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
	rules: [{
	  test: /\.(png|jpg|gif|scss|js)$/,
	  exclude: /(node_modules|bower_components)/,
	  use: [{
		loader: "css-loader", // translates CSS into CommonJS
	  }, {
		loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
	  }, {
		loader: "file-loader",
	  }, {
		loader: "babel-loader",
        query: {
          plugins: ['lodash'],
          presets: [['@babel/preset-env', { 'targets': { 'node': 6 } }]]
        }
	  }]
	}]
  }
};
