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
    connection: 'messaging_challenge'
  }
};
