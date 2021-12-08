const {Model} = require('objection');

class GroupMessages extends Model {

  static get tableName() {
    return 'groupMessages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: {type: 'string'},
        groupConversationId: {type: 'string'},
        senderId: {type: 'string'},
        content: {type: 'string'},
        created_at: {type: 'string'},
        read: {type: 'string'},
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Users = require('./users');
    const GroupConversations = require('./groupConversations');
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'messages.senderId',
          to: 'users.id'
        }
      },
      groupConversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: GroupConversations,
        join: {
          from: 'groupMessages.groupConversationId',
          to: 'groupConversations.id'
        }
      },
    };
  }
}

module.exports = GroupMessages;
