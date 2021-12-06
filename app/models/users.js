const {Model} = require('objection');

class Users extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: {type: 'string', format: 'uuid'},
        name: {type: 'string'},
        created_at: {type: 'string', format: 'date-time'}
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Conversations = require('./conversations');
    return {
      conversations: {
        relation: Model.HasManyRelation,
        modelClass: Conversations,
        join: {
          from: 'users.id',
          to: 'conversations.senderId'
        }
      },
    };
  }
}

module.exports = Users;
