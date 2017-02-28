// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'classifieds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'classifieds-test',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

};
