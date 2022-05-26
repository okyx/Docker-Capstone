const routes = (handler) => [
  {
    method:'GET',
    path: '/recipes',
    handler: handler.getBestRecipesHandler
  }
];

module.exports = routes;
