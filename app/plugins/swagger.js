const Package = require('../../package.json');

module.exports = [
  {
    plugin: require('hapi-swagger'),
    options: {
      info: {
        title: 'Messaging API Documentation',
        version: Package.version
      },
      securityDefinitions: {
        'jwt': {
          'type': 'apiKey',
          'name': 'Authorization',
          'in': 'header'
        }
      },
      security: [{'jwt':[]}],
      grouping: 'tags'
    }
  },
  {
    plugin: require('@hapi/inert')
  },
  {
    plugin: require('@hapi/vision')
  }
];
