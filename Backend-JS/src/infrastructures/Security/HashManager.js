const HashPassword = require('../../Applications/security/HashPassword');

class HashManager extends HashPassword {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(password, hashedPassword) {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new Error('Password salah');
    }
  }
}

module.exports = HashManager;
