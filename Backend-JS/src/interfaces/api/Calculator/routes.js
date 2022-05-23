const routes = (handler) => [
  {
    method: 'GET',
    path: '/calculators',
    handler: handler.GetCalculateHandler,
    options: {
      auth: 'jwtUntukNutriA',
    }
  }
]

module.exports = routes;