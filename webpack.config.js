const path = require('path');

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
      { test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          { loader: "babel-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  }
}