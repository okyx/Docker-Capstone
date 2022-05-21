const MealHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: 'Meal',
  version: '1.0.0',
  register: async (server, {container}) => {
    const mealHandler = new MealHandler(container);
    server.route(routes(mealHandler));
  }
}