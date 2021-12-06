const {Model} = require('objection');

class Messages extends Model {

  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string'},
        conversationId: {type: 'string'},
        senderId: {type: 'string'},
        content: {type: 'string'},
        created_at: {type: 'string'},
        read_at: {type: 'string'},
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Users = require('./users');
    const Conversations = require('./conversations');
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'messages.senderId',
          to: 'users.id'
        }
      },
      conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversations,
        join: {
          from: 'messages.conversationId',
          to: 'conversations.id'
        }
      },
    };
  }
}

module.exports = Messages;
