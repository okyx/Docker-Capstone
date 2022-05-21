const routes = (handler) => [
  {
    method: 'GET',
    path: '/calculators',
    handler: handler.GetCalculateHandler,
  }
]

module.exports = routes;