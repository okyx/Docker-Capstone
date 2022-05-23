class Auth {
  async addToken(token) {
    throw new Error('can\'t use this class directly');
  }

  async checkAvailabilityToken(token) {
    throw new Error('can\'t use this class directly');
  }

  async deleteToken(token) {
    throw new Error('can\'t use this class directly');
  }
}

module.exports = Auth;
