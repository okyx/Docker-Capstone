const AuthenticationManagerAbstract = require("../../applications/Security/AuthenticationManagerAbstract");

class tokenManager extends AuthenticationManagerAbstract {
  constructor(jwt) {
    super();
    this._jwt = jwt.token;
  }
  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }
  async createRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }
  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new Error('refresh token tidak valid');
    }
  }
  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = tokenManager;