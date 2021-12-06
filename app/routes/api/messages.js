const messageController = require('../../controllers/messages');
const joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/messages/by_conversation/{id}',
    handler: messageController.getMessagesByConversationId,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        })
      },
      description: 'Show all messages by conversation',
      tags: ['api', 'Messages'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/messages',
    handler: messageController.createMessage,
    options: {
      validate: {
        payload: joi.object().keys({
          senderId: joi.string().required(),
          conversationId: joi.string().required(),
          content: joi.string().required()
        })
      },
      description: 'Send messages for both users',
      tags: ['api', 'Messages'],
      auth: false
    }
  },
];
