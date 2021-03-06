const {Model} = require('objection');

class Conversations extends Model {

  static get tableName() {
    return 'conversations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string'},
        senderId: {type: 'string'},
        recipientId: {type: 'string'},
        created_at: {type: 'string'}
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Users = require('./users');
    const Messages = require('./messages');
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
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Messages,
        join: {
          from: 'conversations.id',
          to: 'messages.conversationId'
        }
      }
    };
  }
}

module.exports = Conversations;
