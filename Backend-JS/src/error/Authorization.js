const ClientError = require('./ClientError');

class Authorization extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = Authorization;
