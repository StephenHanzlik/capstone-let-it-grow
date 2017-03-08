'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const request = require("request");
const rp = require('request-promise');
// const http = require('http');


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

router.post('/', (req, res, next) => {
  const { light, temperature, humidity, soil_moisture } = req.body;
  const insertPost = { light, temperature, humidity, soil_moisture  };
  if(insertPost.humidity > 100){
    insertPost.humidity = 100;
  }
  insertPost.created_at = new Date();

  var options = {
    uri: 'https://limitless-river-10033.herokuapp.com/smssettings',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

function foo(address, fn, obj){
  rp(options)
  .then(function (data) {
    // console.log(data);
    fn(data, obj);
  })
  .catch(function (err) {
    // API call failed...
  });
}

foo("address", function(settings, insertPost){
  console.log("settings");
  console.log(settings);
  let now = new Date();
  let arrNow = [];
  let nowString = now.toString();
  for(let i = 16; i <= 20; i++){
    if(nowString.charAt(i) !== ":"){
      arrNow.push(nowString.charAt(i));
    }
  }
  let joinedNowString = arrNow.join('');
  let currentTimeInt = parseInt(joinedNowString);

// currentTimeInt >= settings.on_time
  if(currentTimeInt >= settings.on_time && currentTimeInt <= settings.off_time){
  if (insertPost.light < 1 && settings.text_sent < 1){

            var options = {
              method: 'POST',
              uri: 'https://limitless-river-10033.herokuapp.com/smssettings',
              body: {
                on_time: settings.on_time,
                off_time: settings.off_time,
                max_temp: settings.max_temp,
                min_temp: settings.min_temp,
                max_humid: settings.max_humid,
                min_humid: settings.min_humid,
                text_sent: 1
              },
              json: true // Automatically stringifies the body to JSON
              };

              rp(options)
              .then(function (parsedBody) {
                // POST succeeded...
                console.log("this is successfully parsed body:");
                console.log(parsedBody);
              })
              .catch(function (err) {
                // POST failed...
                console.log(err);
              });
    //send text warning about lights
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
      to: "+16109844474",//Me
      // to: "+14848666955",//Keller

      from: "+14846265179",
      // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      body: "WARNING:  Lights have turned off out of schedule",

    }, function(err, message) {
      console.log(message.sid);
      // res.send(req.body);
    });
  }
}
console.log('settings.text_sent');
console.log(settings.text_sent);
if(settings.text_sent < 1){
  if (insertPost.temperature >= settings.max_temp && insertPost.temperature <= settings.min_temp) {
    console.log('insertPost.temperature');
    console.log(insertPost.temperature);
    console.log('settings.max_temp');
    console.log(settings.max_temp);
    console.log('settings.min_temp');
    console.log(settings.min_temp);
    //send warning text about temps w/ metric included
    //send text warning about lights
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
      to: "+16109844474",//Me
      // to: "+14848666955",//Keller

      from: "+14846265179",
      // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      // body: "WARNING:  Temperature have turned off out of schedule",
      body: `WARNING: Temperature is ${insertPost.temperature}°F`,

    }, function(err, message) {
      console.log(message.sid);
      // res.send(req.body);
    });
  }
  if(insertPost.humidity >= settings.max_humid || insertPost.humidity <= settings.humid) {
    //send warning text about humid w/ metric included
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
      to: "+16109844474",//Me
      // to: "+14848666955",//Keller

      from: "+14846265179",
      // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      // body: "WARNING:  Temperature have turned off out of schedule",
      body: `WARNING: Humidty is at ${insertPost.humidity}%`,

    }, function(err, message) {
      console.log(message.sid);
      // res.send(req.body);
    });
  }
}

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
            res.send(results[0]);
          })
          .catch((err) => {
            next(err);
          });


}, insertPost)


});



  // request({
  //   uri: "https://limitless-river-10033.herokuapp.com/smssettings",
  //   method: "GET"
  // }, function  (error, response, body) {
  //   // console.log(body);
  //   // if(body.on_time === 1123){}
  //   // if(true){
  //   console.log("body");
  //   console.log(body);
  // });
// console.log("youshallnotpass");
// console.log(youshallnotpass);
// console.log("holdVal");
// console.log(holdVal);



        // const { light, temperature, humidity, soil_moisture } = req.body;
        // const insertPost = { light, temperature, humidity, soil_moisture  };


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
        //   // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        //   body: "WARNING:  Lights have turned off out of schedule",
        //
        // }, function(err, message) {
        //   console.log(message.sid);
        //   res.send(req.body);
        // });
//     }
// }
// else if (req.body.light >= 1 && lightToggle >= 1){
//   console.log("light toggle");
//   console.log(lightToggle);
//   lightToggle -= 1;
// }

// if(req.body.humidity && req.body.temperature){

  // }//end of huimidt & control flow
// });







module.exports = router;
