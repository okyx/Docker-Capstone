const routes = (handler) => [
  {
    method: 'POST',
    path: '/predict',
    handler: handler.postPredictImage,
    options: {
      auth: 'jwtUntukNutriA',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      }
    }
  }
];

module.exports = routes;