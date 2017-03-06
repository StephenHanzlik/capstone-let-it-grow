'use strict';

var express = require('express');
var route = express.Router();

var bcrypt = require('bcrypt');

var db = require('../knexfile.js')['development'];
var knex = require('knex')(db);

route.get('/', (req, res, next) => {
  res.send('Root');
});

route.post('/', (req, res, next) => {
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        // to: "+16109844474",//Me
        to: "+14848666955",//Keller

        from: "+14846265179",
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    }, function(err, message) {
        console.log(message.sid);
    });




});

route.post('/logout', (req, res, next) => {
  req.session = null;
  res.send();
});

module.exports = route;
