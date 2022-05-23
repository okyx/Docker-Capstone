class RefreshToken {
  constructor(payload) {
    this._verifyPayload(payload);
    this.refreshToken = payload.refreshToken;
  }
  _verifyPayload({ refreshToken }) {

    if (!refreshToken) {
      throw new Error('Can\'t empty parameter');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('wrong type of parameter');
    }
  }
}

module.exports = RefreshToken;