const NewUser = require('../../domain/User/entities/NewUser');
const NewAuth = require('../../domain/Authentications/entities/NewAuth');

class AddUserUseCase {
  constructor({ tokenManager, hashManager, userService, authService }) {
    this._tokenManager = tokenManager;
    this._hashManager = hashManager;
    this._userService = userService;
    this._authService = authService;
  }
  async execute(payloads) {
    const payload = new NewUser(payloads);
    await this._userService.verifyAvailableEmail(payload.email);
    payload.password = await this._hashManager.hash(payload.password);
    const id = await this._userService.addUser(payload);
    const email = payload.email;
    const accessToken = await this._tokenManager.createAccessToken({ email,id, });
    const refreshToken = await this._tokenManager.createRefreshToken({ email,id, });
    const newAuth = new NewAuth({
      accessToken,
      refreshToken
    })
    await this._authService.addToken(newAuth.refreshToken);
    return newAuth;
  }
}

module.exports = AddUserUseCase;