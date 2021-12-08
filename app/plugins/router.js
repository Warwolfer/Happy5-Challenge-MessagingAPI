const routes = [].concat(
  require('../routes/api/base'),
  require('../routes/api/users'),
  require('../routes/api/conversations'),
  require('../routes/api/groupConversations'),
  require('../routes/api/messages'),
  require('../routes/api/groupMessages')
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
