const AuthenticationHandler = require("./handler")
const routes = require('./routes');
module.exports = {
  name: 'auth',
  version: '1.0.0',
  register: async(server, {container})=> {
    const authHandler = new AuthenticationHandler(container);
    server.route(routes(authHandler))
  }
}