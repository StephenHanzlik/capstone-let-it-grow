// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'postgres://localhost/3000'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

};
