// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'let-it-grow-db'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

};
