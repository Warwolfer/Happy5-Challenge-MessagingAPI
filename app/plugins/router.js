const routes = [].concat(
  require('../routes/api/base'),
  require('../routes/api/users'),
  require('../routes/api/conversations'),
  require('../routes/api/messages')
)
;
module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes);
    }
  }
};
