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
  //
  // knex('data')
  //   .orderBy('id', 'asc')
  //   .limit(1)
  //   .del()
  //   .then(() => {
  //     return;
  //   })
  //   .catch((err) => {
  //     next(boom.create(500, 'Database Query Failed'));
  //   });
});

router.post('/', (req, res, next) => {
  const { light, temperature, humidity, soil_moisture } = req.body;
  const insertPost = { light, temperature, humidity, soil_moisture };
  if (insertPost.humidity > 100) {
    insertPost.humidity = 100;
  }
  insertPost.created_at = new Date();

  var options = {
    uri: 'https://dinkydinky.herokuapp.com/smssettings',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  function asynchData(postData, fn, obj) {
    rp(options)
      .then(function(data) {
        // console.log(data);
        fn(data, obj);
      })
      .catch(function(err) {
        // API call failed...
      });
  }

  asynchData("postData", function(settings, insertPost) {
    let now = new Date();
    let arrNow = [];
    let nowString = now.toString();
    for (let i = 16; i <= 20; i++) {
      if (nowString.charAt(i) !== ":") {
        arrNow.push(nowString.charAt(i));
      }
    }
    let joinedNowString = arrNow.join('');
    let currentTimeInt = parseInt(joinedNowString);

    // currentTimeInt >= settings.on_time
    if (currentTimeInt >= settings.on_time && currentTimeInt <= settings.off_time) {
      if (insertPost.light < 1 && settings.text_sent < 1) {

        var options = {
          method: 'POST',
          uri: 'https://dinkydinky.herokuapp.com/smssettings',
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
          .then(function(parsedBody) {
            // POST succeeded...
            console.log("this is successfully parsed body:");
            console.log(parsedBody);
          })
          .catch(function(err) {
            // POST failed...
            console.log(err);
          });
        //send text warning about lights
        var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
        var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

        //require the Twilio module and create a REST client
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          body: "WARNING:  Lights have turned off out of schedule",

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Temperature have turned off out of schedule",
          body: "https://dinkydinky.herokuapp.com/data"

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
      }
    }
    console.log('settings.text_sent');
    console.log(settings.text_sent);
    if (settings.text_sent < 1) {

      var options = {
        method: 'POST',
        uri: 'https://dinkydinky.herokuapp.com/smssettings',
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
        .then(function(parsedBody) {
          // POST succeeded...
          console.log("this is successfully parsed body:");
          console.log(parsedBody);
        })
        .catch(function(err) {
          // POST failed...
          console.log(err);
        });

      if (insertPost.soil_moisture < 220) {

        //send warning text about temps w/ metric included
        //send text warning about lights
        var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
        var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

        //require the Twilio module and create a REST client
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          body: "WARNING: Soil is dry, prepare nutrients"

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Temperature have turned off out of schedule",
          body: "https://dinkydinky.herokuapp.com/data"

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });

      }


      if (insertPost.temperature >= settings.max_temp || insertPost.temperature <= settings.min_temp) {
        //send warning text about temps w/ metric included
        //send text warning about lights
        var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
        var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

        //require the Twilio module and create a REST client
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Temperature have turned off out of schedule",
          body: `WARNING: Temperature is at ${insertPost.temperature}°F`,

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Temperature have turned off out of schedule",
          body: "https://dinkydinky.herokuapp.com/data",

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
      }
      if (insertPost.humidity >= settings.max_humid || insertPost.humidity <= settings.humid) {
        //send warning text about humid w/ metric included
        var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
        var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

        //require the Twilio module and create a REST client
        var client = require('twilio')(accountSid, authToken);

        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Temperature have turned off out of schedule",
          body: `WARNING: Humidity is at ${insertPost.humidity}%`,

        }, function(err, message) {
          console.log(message.sid);
          // res.send(req.body);
        });
        client.messages.create({
          to: "+16109844474", //Me

          from: "+14846265179",
          // body: "This is the ship that made the Kessel Run in fourteen parsecs?",
          // body: "WARNING:  Tempe rature have turned off out of schedule",
          body: "https://dinkydinky.herokuapp.com/data",

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
        // res.send(results[0]);
        let idToSub = results[0].id;
        let idToDel = idToSub - 10;

        var options = {
          method: 'DELETE',
          uri: `https://dinkydinky.herokuapp.com/data/${idToDel}`,
          resolveWithFullResponse: true
        };

        rp(options)
          .then(function(response) {
            console.log("DELETE succeeded with status %d", response.statusCode);
          })
          .catch(function(err) {
            // Delete failed...
          });

      })
      .catch((err) => {
        next(err);
      });


  }, insertPost)


});

router.delete('/:id', (req, res, next) => {

  knex('data')
    .where({ id: req.params.id })
    .del()
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      next(err);
    });
});









module.exports = router;
