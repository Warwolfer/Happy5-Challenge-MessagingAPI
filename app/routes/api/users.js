const userController = require('../../controllers/users');
const joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: userController.getUsers,
    options: {
      description: 'Show all users',
      tags: ['api', 'Users'],
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: userController.createUser,
    options: {
      validate: {
        payload: joi.object().keys({
          name: joi.string().required(),
        })
      },
      description: 'Create User',
      tags: ['api', 'Users'],
      auth: false
    }
  },
];
