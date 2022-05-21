const Hapi = require('@hapi/hapi');
const predict = require('../../interfaces/api/predictImage');
const calculator = require('../../interfaces/api/Calculator');
const meal = require('../../interfaces/api/Meals');
const recipe = require('../../interfaces/api/Recipes');

const createServer = async(container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register([
    {
      plugin: predict,
      options: {container},
    },
    {
      plugin: calculator,
      options: {container},
    },
    {
      plugin: meal,
      options: {container},
    },
    {
      plugin: recipe,
      options: {container},
    }
  ]);
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {

      const newResponse = h.response({
        status: 'error',
        message: response.message,
      });
      newResponse.code(400);
      return newResponse;
    }

    return h.continue;
  });
  return server;
}
module.exports = createServer;