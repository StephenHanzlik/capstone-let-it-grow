'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('data').del()
    .then(function() {
      return Promise.all([
          // Inserts seed entries
          knex('data').insert({
            id: 1,
            light: 0,
            temperature: 88,
            humidity: 100,
            soil_moisture: 700,
            created_at: new Date('2016-06-26T14:26:16.000Z')
          }),
          knex('data').insert({
            id: 2,
            light: 1,
            temperature: 69,
            humidity: 10,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:26:16.000Z')
          })
        ])
        .then(() => {
          return knex.raw(
            "SELECT setval('data_id_seq', (SELECT MAX(id) FROM data))"
          );
        });
    });
};;
