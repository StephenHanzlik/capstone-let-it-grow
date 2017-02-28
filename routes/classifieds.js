'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

// YOUR CODE HERE
// console.log("before get in route");
router.get('/', (req, res, next) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'price', 'item_image')
    .then((results) => {
      res.send(results)
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/:id', (req, res, next) => {
  knex('classifieds')
    .where({ id: req.params.id })
    .first()
    .select('id', 'title', 'description', 'price', 'item_image')
    .then((results) => {
      res.send(results)
    })
    .catch((err) => next(err))
});

router.post('/', (req, res, next) => {
  const { id, title, description, price, item_image } = req.body;
  const insertPost = { id, title, description, price, item_image };
  knex('classifieds')
    .insert((insertPost), '*')
    .then((results) => {
      let resObj = results[0];
      let returnObj = {
        id: resObj.id,
        description: resObj.description,
        price: resObj.price,
        item_image: resObj.item_image,
        title: resObj.title
      }
      res.send(returnObj);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return next();
  }
  console.log("req.body");
  console.log(req.body);

  knex('classifieds')
    .where('id', id)
    .returning('*')
    .then((results) => {
      const { id, title, description, price, item_image } = req.body;
      let updateClass = {};
      updateClass.title = title;
      updateClass.description = description;
      updateClass.price = price;
      updateClass.item_image = item_image;
      console.log("updateClass");
      console.log(updateClass);
      // let patchItem = { id, title, description, price, item_image };
      // patchItem.title =
      return knex('classifieds')
        .update(updateClass, '*')
        .where('id', id);
    })
    .then((results) => {
      let result = results[0];
      let returnObj = {
        id: result.id,
        description: result.description,
        price: result.price,
        item_image: result.item_image,
        title: result.title
      }
      res.send(returnObj);
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }
  var tempObj = {};

  knex('classifieds')
    .where('id', id)
    .first()
    .then((msg) => {
      if (!msg) {
        return next();
      }
      tempObj = {
        id: msg.id,
        title: msg.title,
        description: msg.description,
        price: msg.price,
        item_image: msg.item_image
      };
      // res.send(tempObj);
    });
  knex('classifieds')
    .where({ 'id': id })
    .del()
    .then(function() {
      res.send(tempObj);
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
