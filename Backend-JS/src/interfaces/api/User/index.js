const UserHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server , { container })=> {
    const userHandler = new UserHandler(container);
    server.route(routes(userHandler))
  }
}