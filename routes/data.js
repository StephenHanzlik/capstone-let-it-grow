'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const request = require("request");


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
//
// let lightToggle = 0;
// let lightOnTime = 0;
// let lightOffTime = 0;
// let currentTime = 0;

router.post('/', (req, res, next) => {

  request({
    uri: "https://limitless-river-10033.herokuapp.com/smssettings",
    method: "GET"
  }, function(error, response, body) {
    if(response.data.on_time === 1123){




        const { light, temperature, humidity, soil_moisture } = req.body;
        const insertPost = { light, temperature, humidity, soil_moisture  };
        if(insertPost.humidity > 100){
          insertPost.humidity = 100;
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





    }
  });

//   if(req.body.smsLightOn){
//     console.log("req.body.smsLightOn:");
//     console.log(req.body.smsLightOn);
//       lightOffTime = req.body.smsLightOff;
//       lightOnTime = req.body.smsLightOn;
//       currentTime = req.body.currentTime;
//       res.send(req.body);
//   }
//   if(req.body.light <= 0 && lightToggle <= 0){
//     console.log("req.body.light:");
//     console.log(req.body.light);
//     if(currentTime >= lightOnTime && currentTime <= lightOnTime){
//       console.log("currentTime:");
//       console.log(currentTime);
//       console.log(" VS lightOnTime:");
//       console.log(lightOnTime);
//       //light should be on during this time
//       lightToggle += 1;
//       var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
//       var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';
//
//       //require the Twilio module and create a REST client
//       var client = require('twilio')(accountSid, authToken);
//
//       client.messages.create({
//         to: "+16109844474",//Me
//         // to: "+14848666955",//Keller
//
//         from: "+14846265179",
//         // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
//         body: "WARNING:  Lights have turned off out of schedule",
//
//       }, function(err, message) {
//         console.log(message.sid);
//         res.send(req.body);
//       });
//     }
// }
// else if (req.body.light >= 1 && lightToggle >= 1){
//   console.log("light toggle");
//   console.log(lightToggle);
//   lightToggle -= 1;
// }

// if(req.body.humidity && req.body.temperature){

  // }//end of huimidt & control flow
});







module.exports = router;
