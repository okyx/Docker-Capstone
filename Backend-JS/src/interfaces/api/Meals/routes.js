const Fetching = require("../../../applications/Fetching/Fetching");

const routes = (handler) => [
  {
    method: 'GET',
    path:'/meals',
    handler: handler.getBestMealHandler,
  }
]

module.exports = routes;