
const api = require("./api-server/apiServer.js");
const dev = require("./webpack-server/devServer.js");
const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  api.apiServer(PORT);
} else {
  api.apiServer(PORT - 1);
  dev.devServer(PORT);
}