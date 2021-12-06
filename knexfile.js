// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'messaging_challenge',
      user: 'messaging_user',
      password: 'messaging_password',
      port: '5432',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    }
  }
};
