'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
          // Inserts seed entries
          knex('users').insert({
            id: 1,
            Email: 'dinky@gmail.com',
            Username: 'dinky',
            Password: "dinky",
            created_at: new Date('2016-06-26T14:26:16.000Z')
          }),
          knex('users').insert({
            id: 2,
            Email: 'dinky2@gmail.com',
            Username: 'eggzzz',
            Password: "dinky",
            created_at: new Date('2016-06-26T14:26:16.000Z')
          })
        ])
        .then(() => {
          return knex.raw(
            "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"
          );
        });
    });
};
