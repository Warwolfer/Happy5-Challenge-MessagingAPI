const conversationController = require('../../controllers/conversations');
const joi = require('joi');
const userController = require('../../controllers/users');

module.exports = [
  {
    method: 'GET',
    path: '/conversations/by_user/{id}',
    handler: conversationController.getConversationsByUserId,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        })
      },
      description: 'Show all conversations by user',
      tags: ['api', 'Conversations'],
      auth: false
    }
  }, {
    method: 'PATCH',
    path: '/conversations/by_user/{id}',
    handler: conversationController.readConversation,
    options: {
      validate: {
        params: joi.object().keys({
          id: joi.string().required()
        })
      },
      description: 'Show all conversations by user',
      tags: ['api', 'Conversations'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/conversations',
    handler: conversationController.createConversation,
    options: {
      validate: {
        payload: joi.object().keys({
          senderId: joi.string().required(),
          recipientId: joi.string().required()
        })
      },
      description: 'Create conversations for both users',
      tags: ['api', 'Conversations'],
      auth: false
    }
  },
];
