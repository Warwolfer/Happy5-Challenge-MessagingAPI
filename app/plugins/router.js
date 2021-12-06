const routes = [].concat(
  require('../routes/api/base'),
);
module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes);
    }
  }
};
