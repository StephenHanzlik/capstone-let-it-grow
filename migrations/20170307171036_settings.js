'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('settings', table => {
    table.increments().notNullable();
    table.integer("on_time").defaultTo(0).notNullable()
    table.integer("off_time").defaultTo(0).notNullable()
    table.integer("max_temp").defaultTo(0).notNullable()
    table.integer("min_temp").defaultTo(0).notNullable()
    table.integer("min_humid").defaultTo(0).notNullable()
    table.integer("max_humid").defaultTo(0).notNullable()
    table.timestamps(true, false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('settings')
};
