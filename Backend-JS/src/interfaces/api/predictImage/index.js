const PredictHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'predict',
  version: '1.0.0',
  register: async(server, { container }) => {
    const predictHandler = new PredictHandler(container);
    server.route(routes(predictHandler));
  }
}