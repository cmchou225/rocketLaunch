const express = require('express');
const path = require('path');
const launchLogic = require('./launchLogic.js');

const app = express();

const date = {};

const apiServer = (PORT) => {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.listen(PORT);
};

app.get('/', (req, res) => {
  date.now = Date.now();
  launchLogic.apiLogic(date)
  .then(result => {
    date.lastUpdate = Date.now();
    console.log(date);
    res.send(result);
  })
});



module.exports.apiServer = apiServer;


