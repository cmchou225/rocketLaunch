const express = require('express');
const path = require('path');
const launchLogic = require('./logic/launchLogic.js');

const app = express();

const date = {};

const apiServer = (PORT) => {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
  app.listen(PORT);
};

app.get('/data', (req, res) => {
  date.now = Date.now();
  launchLogic.apiLogic(date)
  .then(result => {
    date.lastUpdate = Date.now();
    res.send(result);
  })
  .catch( err => {
    console.log(err.response.data);
    res.status(500).send('Error obtaining data from api server');
  })
});
module.exports.apiServer = apiServer;


