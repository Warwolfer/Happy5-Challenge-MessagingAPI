const groupConversationController = require('../../controllers/groupConversations');
const joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/group_conversations/by_user/{id}',
    handler: groupConversationController.getGroupConversationsByUserId,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        })
      },
      description: 'Show all group conversations by user',
      tags: ['api', 'Group Conversations'],
      auth: false
    }
  }, {
    method: 'PATCH',
    path: '/group_conversations/by_conversation/{id}',
    handler: groupConversationController.readGroupConversation,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        }),
        payload: joi.object().keys({
          userId: joi.string().required()
        })
      },
      description: 'Read all unread messages in a group conversation',
      tags: ['api', 'Group Conversations'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/group_conversations/invite',
    handler: groupConversationController.inviteToGroupConversation,
    options: {
      validate: {
        payload: joi.object().keys({
          groupConversationId: joi.string().required(),
          userId: joi.string().required()
        })
      },
      description: 'Invite to group conversation',
      tags: ['api', 'Group Conversations'],
      auth: false
    }
  }, {
    method: 'POST',
    path: '/group_conversations',
    handler: groupConversationController.createGroupConversation,
    options: {
      validate: {
        payload: joi.object().keys({
          creatorId: joi.string().required(),
          name: joi.string().required()
        })
      },
      description: 'Create group conversation',
      tags: ['api', 'Group Conversations'],
      auth: false
    }
  },
];
