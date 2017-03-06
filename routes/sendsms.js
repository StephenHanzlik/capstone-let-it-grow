'use strict';

'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');


router.get('/', (req, res, next) => {
  res.send('Root');
});

router.post('/', (req, res, next) => {
  // if(req.body.lightOff <= 1){
    // var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    // var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';
    //
    // //require the Twilio module and create a REST client
    // var client = require('twilio')(accountSid, authToken);
    //
    // client.messages.create({
    //   to: "+16109844474",//Me
    //   // to: "+14848666955",//Keller
    //
    //   from: "+14846265179",
    //   body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    // }, function(err, message) {
    //   console.log(message.sid);
    // });
    // next(boom.create(200, 'Hit text route'));
  // }
  // else{
  //   console.log("light is still on ");
  //   // next(boom.create(500, 'Error reaching text'));
  // }
});

router.post('/logout', (req, res, next) => {
  req.session = null;
  res.send();
});

module.exports = router;
