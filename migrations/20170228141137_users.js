'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    // id
    table.increments().notNullable();
    // username
    table.string('Username').notNullable();
    // hashed password
    table.string('Password').notNullable();
    // email
    table.string('Email').notNullable();
    // created_at
    table.timestamps(true, false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
