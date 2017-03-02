var express = require('express');
var route = express.Router();
var bcrypt = require('bcrypt');

var db = require('../knexfile.js')['development'];

var knex = require('knex')(db);

route.post('/', (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, 8);

  knex('users')
    .where({ username: req.body.username })
    .then(function(results) {
      if (results.length === 0) {
        knex('users')
          .insert({
            username: req.body.username,
            password_hash: hash
          })
          .then(function(result) {
            res.sendStatus(201);
          })
          .catch(function(err) {
            next(err);
          });
      } else {
        res.status(400).send('User Already Exists');
      }
    });
});

route.use(function(req, res, next) {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next();
  }
});

route.get('/', function(req, res, next) {
  knex('users')
    .select('username')
    .then(function(results) {
      res.send(results);
    })
    .catch(function(err) {
      next(err);
    });
});

route.get('/:username', function(req, res, next) {
  knex('users')
    .select('username')
    .where({ username: req.params.username })
    .first()
    .then(function(results) {
      if (results) {
        res.send(results);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function(err) {
      next(err);
    });
});

route.use(function(req, res, next) {
  if (!req.user.isAdmin) {
    res.sendStatus(401)
  } else {
    next();
  }
});
route.delete('/:username', function(req, res, next) {
  knex('users')
    .where({ username: req.params.username })
    .del()
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(err) {
      next(err);
    });
});


module.exports = route;

//Old route set up from q2pis

// 'use strict';
//
// const express = require('express');
// const router = express.Router();
// const knex = require('../knex');
// const boom = require('boom');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const privateKey = 'my_awesome_cookie_signing_key';
//
// const authorize = function(req, res, next) {
//   const token = req.cookies.token;
//   jwt.verify(token, privateKey, (err, decoded) => {
//     if (err) {
//       next(boom.create(400, 'Failed to decode token'));
//     }
//     req.token = decoded;
//     next();
//   });
// };
//
// router.get('/', function(req, res, next) {
//   knex('users')
//     .orderBy('Username')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       next(boom.create(500, 'Database Query Failed'));
//     });
// });
//
// // router.get('/:id', function(req, res, next) {
// //   knex('users')
// //     .where({ id: req.params.id })
// //     .first()
// //     .then(function(results) {
// //       if (results) {
// //         res.send(results);
// //       } else {
// //         next(boom.create(404, 'No user matching that id'));
// //       }
// //     })
// //     .catch(function(err) {
// //       next(boom.create(500, 'Database Query Failed'));
// //     });
// // });
//
// router.post('/', (req, res, next) => {
//   var hash = bcrypt.hashSync(req.body.Password, 8);
//   knex('users')
//     .where({ Username: req.body.Username })
//     .then(function(results) {
//       console.log("results" + results);
//
//       if (results.length === 0) {
//         knex('users')
//           .insert({
//             Username: req.body.Username,
//             Password: hash,
//             Email: req.body.Email,
//             created_at: new Date(),
//           }, '*')
//           .then(function(result) {
//             console.log('user created:', result);
//             let userData = result[0];
//             delete userData.Password;
//             delete userData.created_at;
//             delete userData.updated_at;
//             delete userData.Username;
//             delete userData.Email;
//             res.send(userData);
//           })
//           .catch(function(err) {
//             console.log(err);
//             next(boom.create(500, 'Failed to create User'));
//           });
//       } else {
//         next(boom.create(400, 'User Already Exists'));
//       }
//     });
// });

// router.patch('/:id', authorize, function(req, res, next) {
//   knex('users')
//     .max('id')
//     .then((result) => {
//       if (req.body.password) {
//         if (req.params.id <= result[0].max && req.params.id > 0 && !isNaN(req.params.id)) {
//           return knex('users')
//             .where({ id: req.params.id })
//             .first()
//             .update({
//               username: req.body.username,
//               password: bcrypt.hashSync(req.body.password, 8),
//               email: req.body.email
//             }, '*')
//             .then((result) => {
//               //TODO: don't send password back on a successfull patch
//               res.send(result[0]);
//             })
//             .catch((err) => {
//               next(boom.create(500, 'Failed to Update User Info'));
//             });
//         } else {
//           next(boom.create(404, 'User Not Found'));
//           return;
//         }
//       } else {
//         next(boom.create(404, 'please specify a password'));
//         return;
//       }
//     });
// });
//
// router.delete('/:id', authorize, function(req, res, next) {
//   knex('users')
//     .where({ id: req.params.id })
//     .del()
//     .then(function() {
//       res.sendStatus(200);
//     })
//     .catch(function(err) {
//       next(boom.create(500, 'Failed to delete user'));
//     });
// });





// module.exports = router;
