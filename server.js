'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res, next) {
  res.sendStatus(200);
  // res.sendFile('index.html');
  //
  // if (req.token === 'dinkydinky@gmail.com') {
  //   res.sendFile(path.join(__dirname + '/public/user-landing-admin.html'));
  // } else {
  //   res.sendFile(path.join(__dirname + '/public/user-landing.html'));
  // }
});

var users = require('./routes/users.js');
var data = require('./routes/data.js');
var token = require('./routes/token.js');
var sendsms = require('./routes/sendsms.js');

app.use('/users', users);
app.use('/data', data);
app.use('/token', token);
app.use('/sendsms', sendsms);

app.use('*', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
