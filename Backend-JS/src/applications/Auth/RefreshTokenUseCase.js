const RefreshToken = require("../../domain/Authentications/entities/RefreshToken");

class RefreshTokenUseCase {
  constructor({authService, tokenManager }) {
    this._authService = authService;
    this._tokenManager = tokenManager;
  }
  async execute(payloads) {
    new RefreshToken(payloads);
    const { refreshToken } = payloads;
    await this._tokenManager.verifyRefreshToken(refreshToken)
    await this._authService.checkAvailabilityToken(refreshToken);
    const { email, id } = await this._tokenManager.decodePayload(refreshToken);
    const accessToken = this._tokenManager.createAccessToken({ email, id });
    return accessToken;
  }
}
module.exports = RefreshTokenUseCase;