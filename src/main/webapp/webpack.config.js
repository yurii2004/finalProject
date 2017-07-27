var webpack = require('webpack');
var path = require('path');
var config = {
 
  entry:  path.join(__dirname, './js/app.jsx'),
  output: {
    path:  path.join(__dirname, './js/dist'),
    filename: 'bundle.js'
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/js'),
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      }
    },
    { test: /\.(png|jpg)$/, loader: 'file-loader?name=img/[name].[ext]' }
    ],

  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true

};
module.exports = config;