const CalculatorHandler = require('./handler');
const routes = require('./routes');

module.exports= {
  name: 'Calculator',
  version: '1.0.0',
  register: async (server, {container}) => {
    const calculatorHandler = new CalculatorHandler(container);
    server.route(routes(calculatorHandler));
  }
}