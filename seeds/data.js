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
            humidity: 25,
            soil_moisture: 700,
            created_at: new Date('2016-06-26T14:26:16.000Z')
          }),
          knex('data').insert({
            id: 2,
            light: 1,
            temperature: 84,
            humidity: 26,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:27:16.000Z')
          }),
          knex('data').insert({
            id: 3,
            light: 1,
            temperature: 80,
            humidity: 24,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:28:16.000Z')
          }),
          knex('data').insert({
            id: 4,
            light: 1,
            temperature: 83,
            humidity: 28,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:29:16.000Z')
          }),
          knex('data').insert({
            id: 5,
            light: 1,
            temperature: 78,
            humidity: 30,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:30:16.000Z')
          }),
          knex('data').insert({
            id: 6,
            light: 1,
            temperature: 72,
            humidity: 35,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:31:16.000Z')
          }),
          knex('data').insert({
            id: 7,
            light: 1,
            temperature: 73,
            humidity: 38,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:32:16.000Z')
          }),
          knex('data').insert({
            id: 8,
            light: 1,
            temperature: 69,
            humidity: 39,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:33:16.000Z')
          }),
          knex('data').insert({
            id: 9,
            light: 1,
            temperature: 68,
            humidity: 40,
            soil_moisture: 45,
            created_at: new Date('2016-06-26T14:34:16.000Z')
          })
        ])
        .then(() => {
          return knex.raw(
            "SELECT setval('data_id_seq', (SELECT MAX(id) FROM data))"
          );
        });
    });
};;
