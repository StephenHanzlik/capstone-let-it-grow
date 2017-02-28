'use strict';

const express = require('express');
const app = express();

const messages = require('./routes/classifieds');
const bodyParser = require('body-parser');
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')))

console.log("before get in serverjs");

app.get('/', function(req, res, next) {
  console.log("get route hit");
  res.sendStatus(200);
  // res.sendFile('index.html');
  //
  // if (req.token === 'dinkydinky@gmail.com') {
  //   res.sendFile(path.join(__dirname + '/public/user-landing-admin.html'));
  // } else {
  //   res.sendFile(path.join(__dirname + '/public/user-landing.html'));
  // }
});
app.use('*', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
  console.log("dinkydinky");
});

module.exports = app;
