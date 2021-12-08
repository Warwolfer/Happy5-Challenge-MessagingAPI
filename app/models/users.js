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
        id: {type: 'string'},
        name: {type: 'string'},
        created_at: {type: 'string'}
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Conversations = require('./conversations');
    const GroupConversations = require('./groupConversations');
    return {
      conversations: {
        relation: Model.HasManyRelation,
        modelClass: Conversations,
        join: {
          from: 'users.id',
          to: 'conversations.senderId'
        }
      },
      groupConversations: {
        relation: Model.ManyToManyRelation,
        modelClass: GroupConversations,
        join: {
          from: 'users.id',
          through: {
            from: 'groupConversationParticipants.userId',
            to: 'groupConversationParticipants.groupConversationId',
          },
          to: 'groupConversations.id'
        }
      },
    };
  }
}

module.exports = Users;
