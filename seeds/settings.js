'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('settings').del()
    .then(function() {
      return Promise.all([
          // Inserts seed entries
          knex('settings').insert({
            id: 1,
            on_time: 124,
            off_time: 1600,
            max_temp: 0,
            min_temp: 0,
            max_humid: 0,
            min_humid: 0,
            text_sent: 0
          }),
          knex('settings').insert({
            id: 2,
            on_time: 124,
            off_time: 1600,
            max_temp: 0,
            min_temp: 0,
            max_humid: 0,
            min_humid: 0,
            text_sent: 0
          })
        ])
        .then(() => {
          return knex.raw(
            "SELECT setval('settings_id_seq', (SELECT MAX(id) FROM settings))"
          );
        });
    });
};
