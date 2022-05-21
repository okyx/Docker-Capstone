const routes = (handler) => [
  {
    method: 'POST',
    path: '/predict',
    handler: handler.postPredictImage,
    options: {
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