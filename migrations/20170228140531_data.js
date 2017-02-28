'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('data', table => {
    table.increments().notNullable();
    table.integer("light").defaultTo(0).notNullable()
    table.integer("temperature").defaultTo(0).notNullable()
    table.integer("humidity").defaultTo(0).notNullable()
    table.integer("soil_moisture").defaultTo(0).notNullable()
    table.timestamps(true, false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('data')
};
