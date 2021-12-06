const userController = require('../../controllers/users');

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
];
