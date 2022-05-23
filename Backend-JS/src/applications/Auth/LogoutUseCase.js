const RefreshToken = require("../../domain/Authentications/entities/RefreshToken");

class LogoutUseCase {
  constructor({authService }) {
    this._authService = authService;
  }
  async execute(payloads) {
    new RefreshToken(payloads);
    const { refreshToken } = payloads;
    await this._authService.checkAvailabilityToken(refreshToken);
    await this._authService.deleteToken(refreshToken);
  }
}
module.exports = LogoutUseCase;