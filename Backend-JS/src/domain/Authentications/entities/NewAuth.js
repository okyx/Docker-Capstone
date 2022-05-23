class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);
    this.accessToken =  payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }
  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error('Can\'t empty parameter');
    }
    if(typeof email === 'string' || typeof password === 'string') {
      throw new Error('wrong type of parameter');
    }
  }
}
module.exports = NewAuth;