const express = require("express");
app = express();
const path = require("path");

const apiServer = (PORT) => {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.listen(PORT);
};

module.exports.apiServer = apiServer;


