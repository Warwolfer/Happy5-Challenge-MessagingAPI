const createServer = require('./app/server');
const server = createServer()
    .then(server => {
        server.start();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

module.exports = server;
