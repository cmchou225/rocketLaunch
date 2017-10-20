const webpack = require("webpack");
const config = require("../webpack.config.js");
const WebpackDevServer = require("webpack-dev-server"); 

const PORT = process.env.PORT || 8080;

const devServer = (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    proxy: {
      "*": `http://localhost:${PORT -1}`
    }
  });
  server.listen(PORT, 'localhost');
  console.log(`listening on port ${PORT}`)
};

module.exports.devServer = devServer;