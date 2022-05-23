const routes = (handler) => [
  {
    method:'GET',
    path: '/recipes',
    handler: handler.getBestRecipesHandler,
    options: {
      auth: 'jwtUntukNutriA',
    }
  }
];

module.exports = routes;