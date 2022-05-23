const route = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler
  },
  {
    method: 'PUT',
    path: '/users',
    handler: handler.putUserHandler,
    options: {
      auth: 'jwtUntukNutriA',
    }
  }
]
module.exports = route;