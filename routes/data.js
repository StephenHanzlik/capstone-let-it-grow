'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');


router.get('/', function(req, res, next) {
  knex('data')
    .orderBy('created_at', 'desc')
    // .limit(9)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(boom.create(500, 'Database Query Failed'));
    });
});

router.post('/', (req, res, next) => {
  console.log("post request on local host DATA");
  const { light, temperature, humidity, soil_moisture } = req.body;
  const insertPost = { light, temperature, humidity, soil_moisture  };
  knex('data')
    .insert((insertPost), '*')
    .then((results) => {
      let resObj = results[0];
      let returnObj = {
        // id: resObj.id,
        light: resObj.light,
        temperature: resObj.temperature,
        humidity: resObj.humidity,
        soil_moisture: resObj.soil_moisture
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
