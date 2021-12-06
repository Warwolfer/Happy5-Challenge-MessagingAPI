const Knex = require('knex');
const {Model} = require('objection');

module.exports = {
  plugin: {
    pkg: require('../../package.json'),
    name: 'database',
    register: async (server, options) => {
      const knex = Knex(options);
      Model.knex(knex); // bind all model to knex instance
    }
  },
  options: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'messaging_challenge',
      user: 'messaging_user',
      password: 'messaging_password',
      port: '5432',
      charset: 'utf8',
    }
  }
};
