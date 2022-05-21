const RecipeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name:'recipes',
  version: '1.0.0',
  register: async (server, { container }) => {
    const recipeHandler = new RecipeHandler(container);
    server.route(routes(recipeHandler));
  }
}