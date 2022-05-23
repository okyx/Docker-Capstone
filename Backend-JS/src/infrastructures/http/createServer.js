const Hapi = require('@hapi/hapi');
const predict = require('../../interfaces/api/predictImage');
const calculator = require('../../interfaces/api/Calculator');
const meal = require('../../interfaces/api/Meals');
const recipe = require('../../interfaces/api/Recipes');
const user = require('../../interfaces/api/User');
const auth = require('../../interfaces/api/Authentications');
const Jwt = require('@hapi/jwt');
const DomainErrorTranslator = require('../../error/ErrorTranslator');
const ClientError = require('../../error/ClientError');

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
      plugin: Jwt,
    },
  ]);
  server.auth.strategy('jwtUntukNutriA', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCCESS_TOKEN_AGE,
    },
    validate: (artifact) => ({
      isValid: true,
      credentials: {
        id: artifact.decoded.payload.id,
      },
    }),
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
    },
    {
      plugin: user,
      options: {container},
    },
    {
      plugin: auth,
      options: {container},
    }
  ]);
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });
  return server;
}
module.exports = createServer;