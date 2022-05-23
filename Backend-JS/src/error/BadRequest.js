const ClientError = require('./ClientError');

class BadRequest extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'Bad Request';
  }
}

module.exports = BadRequest;
