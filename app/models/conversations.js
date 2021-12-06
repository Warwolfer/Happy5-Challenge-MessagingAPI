const {Model} = require('objection');

class Conversations extends Model {

  static get tableName() {
    return 'conversations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string', format: 'uuid'},
        senderId: {type: 'string', format: 'uuid'},
        recipientId: {type: 'string', format: 'uuid'},
        created_at: {type: 'string', format: 'date-time'}
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Users = require('./users');
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'conversations.senderId',
          to: 'users.id'
        }
      },
      recipient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'conversations.recipientId',
          to: 'users.id'
        }
      },
    };
  }
}

module.exports = Conversations;
