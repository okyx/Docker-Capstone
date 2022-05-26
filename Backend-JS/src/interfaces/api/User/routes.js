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
  },
  {
    method: 'GET',
    path: '/',
    handler: ()=>{
      return `${process.env.PGHOST}:${process.env.PGPORT}/`;
    },
  },
]
module.exports = route;
