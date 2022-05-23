const Auth = require("../../../domain/Authentications/Auth");

class AuthRepository extends Auth {
  constructor(pg) {
    super();
    this._pg = pg;
  }
  async addToken(token) {
    const query = {
      text: 'INSERT INTO auths VALUES ($1)',
      values: [token],
    };
    await this._pg.query(query);
  }

  async checkAvailabilityToken(token) {
    const query = {
      text: 'SELECT * FROM auths WHERE token = $1',
      values: [token],
    };

    const result = await this._pg.query(query);

    if (result.rows.length === 0) {
      throw new Error('refresh token tidak ada');
    }
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM auths WHERE token = $1',
      values: [token],
    };
    await this._pg.query(query);
  }
}

module.exports = AuthRepository;
