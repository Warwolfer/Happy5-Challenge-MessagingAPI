const Hapi = require('@hapi/hapi');

async function createServer () {
    // Create the hapi server
    const server = Hapi.server({
        port: '3333',
        host: '0.0.0.0'
    });

    return server;
}

module.exports = createServer;
