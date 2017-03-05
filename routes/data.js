'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');


router.get('/', function(req, res, next) {
  knex('data')
    .orderBy('created_at', 'desc')
    .limit(9)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(boom.create(500, 'Database Query Failed'));
    });
});


router.post('/', (req, res, next) => {
  console.log("post request");
  console.log(req.data);
  knex('data')
    .insert(params(req))
    .returning('*')
    .then(posts => res.json(posts[0]))
    .catch(err => next(boom.create(500, 'Failed to Post Data')));
});

function params(req) {
  return {
    temperature: req.body.temperature,
    light: req.body.light,
    humidity: req.body.humidity,
    soil_moisture: req.body.soil_moisture,
  }
}

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
