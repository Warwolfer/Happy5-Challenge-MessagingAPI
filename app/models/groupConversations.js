const {Model} = require('objection');

class GroupConversations extends Model {

  static get tableName() {
    return 'groupConversations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        creatorId: {type: 'string'},
        created_at: {type: 'string'}
      }
    };
  } // jsonSchema

  static get relationMappings() {
    const Users = require('./users');
    const GroupMessages = require('./groupMessages');
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'groupConversations.creatorId',
          to: 'users.id'
        }
      },
      groupMessages: {
        relation: Model.HasManyRelation,
        modelClass: GroupMessages,
        join: {
          from: 'groupConversations.id',
          to: 'groupMessages.groupConversationId'
        }
      },
      participants: {
        relation: Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: 'groupConversations.id',
          through: {
            from: 'groupConversationParticipants.groupConversationId',
            to: 'groupConversationParticipants.userId',
          },
          to: 'users.id'
        }
      },
    };
  }
}

module.exports = GroupConversations;
