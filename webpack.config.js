const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/src/app.html',
//   filename: 'index.html',
//   inject: 'body'
// })
module.exports = {
  devtool: 'source-map',
  entry: [
    __dirname + '/scripts/app.js'
  ],
  output: {
      path: __dirname + '/build',
      filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
 //plugins: [HtmlWebpackPluginConfig]
}