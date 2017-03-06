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
router.post('/', (req, res, next) => {
  const { light, temperature, humidity, soil_moisture } = req.body;
  const insertPost = { light, temperature, humidity, soil_moisture  };
  console.log(insertPost.light);
  if(insertPost.light <= 0 && lightToggle <= 0){
    lightToggle += 1;
    var accountSid = 'AC674af2aaed607cbb23d6d2e718c30d6f';
    var authToken = 'cceebb0dbcbfd2f072e45f83eae2b2b5';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
      to: "+16109844474",//Me
      // to: "+14848666955",//Keller

      from: "+14846265179",
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    }, function(err, message) {
      console.log(message.sid);
    });
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

// router.post('/', (req, res, next) => {
//   console.log("req.body");
//   console.log(req.body);
//   knex('data')
//     .insert(params(req))
//     .returning('*')
//     .then(posts => res.json(posts[0]))
//     .catch(err => next(boom.create(500, 'Failed to Post Data')));
// });
//
// function params(req) {
//   return {
//     temperature: req.body.temperature,
//     light: req.body.light,
//     humidity: req.body.humidity,
//     soil_moisture: req.body.soil_moisture,
//   }
// }

function validate(req, res, next) {
  const errors = [];
  ['temperature', 'light', 'humidity', 'soil_moisture'].forEach(field => {
    if (!req.body[field] || req.body[field].trim() === '') {
      errors.push({ field: field, messages: ["cannot be blank"] })
    }
  })
  if (errors.length) return res.status(422).json({ errors })
  next()
}





module.exports = router;
