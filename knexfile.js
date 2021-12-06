// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     'localhost',
      database: 'messaging_challenge',
      user:     'messaging_user',
      password: 'messaging_password',
      port: '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
