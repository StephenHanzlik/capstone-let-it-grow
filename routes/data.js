'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');


router.get('/', function(req, res, next) {
  knex('data')
    .orderBy('id', 'desc')
    .limit(9)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(boom.create(500, 'Database Query Failed'));
    });
});

let lightToggle = 0;
let lightOnTime = 0;
let lightOffTime = 0;
let currentTime = 0;

router.post('/', (req, res, next) => {
  const { light, temperature, humidity, soil_moisture } = req.body;
  const insertPost = { light, temperature, humidity, soil_moisture  };
  if(insertPost.humidity > 100){
    insertPost.humidity = 100;
  }
  if(req.body.smsLightOn){
      lightOffTime = req.body.smsLightOff;
      lightOnTime = req.body.smsLightOn;
      currentTime = req.body.currentTime;
      alert(lightOffOn);
  }
  if(insertPost.light <= 0 && lightToggle <= 0){
    if(currentTime >= lightOnTime && currentTime <= lightOnTime){
      //then it is ok for the light to be on
      console.log("light is ON during scheduled ON time");
    }
    else if (currentTime < lightOnTime && currentTime > lightOffTime){
        console.log("light is OFF during scheduled ON time");
    lightToggle += 1;
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
      to: "+16109844474",//Me
      // to: "+14848666955",//Keller

      from: "+14846265179",
      // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      body: "WARNING:  Lights have turned off out of scedule",

    }, function(err, message) {
      console.log(message.sid);
    });
  }
}
  else if (insertPost.light >= 1 && lightToggle >= 1){
    lightToggle -= 1;
  }
  insertPost.created_at = new Date();
  knex('data')
    .insert((insertPost), '*')
    .then((results) => {
      let resObj = results[0];
      let returnObj = {
        // id: resObj.id,
        light: resObj.light,
        temperature: resObj.temperature,
        humidity: resObj.humidity,
        soil_moisture: resObj.soil_moisture,
        created_at: resObj.created_at
      }
      res.send(returnObj);
    })
    .catch((err) => {
      next(err);
    });
});







module.exports = router;
