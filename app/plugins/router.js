const routes = [].concat(
  require('../routes/api/base'),
  require('../routes/api/users'),
);
module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes);
    }
  }
};
