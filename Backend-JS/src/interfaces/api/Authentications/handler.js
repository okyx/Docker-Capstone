const LoginUseCase = require("../../../applications/Auth/LoginUseCase");
const LogoutUseCase = require("../../../applications/Auth/LogoutUseCase");
const RefreshTokenUseCase = require("../../../applications/Auth/RefreshTokenUseCase");

class AuthenticationHandler {
  constructor(container) {
    this._container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }
  async postAuthenticationHandler(req,h) {
    const payload = req.payload;
    const loginUseCase = this._container.getInstance(LoginUseCase.name);
    const token = await loginUseCase.execute(payload);
    const response = h.response({
      status:'success',
      token
    });
    response.code(201);
    return response;
  }
  async putAuthenticationHandler(req) {
    const payload = req.payload;
    const refreshTokenUseCase = this._container.getInstance(RefreshTokenUseCase.name)
    const access = await refreshTokenUseCase.execute(payload);
    return {
      status:'success',
      token: {
        access,
      },
    }
  }
  async deleteAuthenticationHandler(req) {
    const payload = req.payload;
    const logoutUseCase = this._container.getInstance(LogoutUseCase.name)
    await logoutUseCase.execute(payload);
    return {
      status:'success',
      message: 'logout',
    }
  }
}

module.exports = AuthenticationHandler;