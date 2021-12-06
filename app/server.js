const Hapi = require('@hapi/hapi');

async function createServer () {
  // Create the hapi server
  const server = Hapi.server({
    port: '3333',
    host: '0.0.0.0'
  });

  await server.register(require('./plugins/router'));
  await server.register(require('./plugins/db'));
  await server.register(require('./plugins/swagger'));
  await server.register(require('./plugins/logging'));


  return server;
}

module.exports = createServer;
