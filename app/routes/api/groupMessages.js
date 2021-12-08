const groupMessageController = require('../../controllers/groupMessages');
const joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/group_messages/by_group_conversation/{id}',
    handler: groupMessageController.getMessagesByGroupConversationId,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        })
      },
      description: 'Show all messages in a group conversation',
      tags: ['api', 'Group Messages'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/group_messages',
    handler: groupMessageController.createGroupMessage,
    options: {
      validate: {
        payload: joi.object().keys({
          senderId: joi.string().required(),
          groupConversationId: joi.string().required(),
          content: joi.string().required()
        })
      },
      description: 'Send messages to a group conversation',
      tags: ['api', 'Group Messages'],
      auth: false
    }
  },
];
