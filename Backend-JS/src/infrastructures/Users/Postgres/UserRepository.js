const User = require('../../../domain/User/User');

class UserRepository extends User {
  constructor(pg, generator) {
    super();
    this._pg = pg;
    this._generator = generator;
  }

  async addUser(payload) {
    const { email, password } = payload;
    const id = `user-${this._generator(48)}`;
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, email, password, null, null, null, null, null, null],
    }
    const result = await this._pg.query(query)
    return result.rows[0].id;
    
  }

  async verifyAvailableEmail(email) {
    const query = {
      text: 'SELECT email from users where email = $1',
      values: [email],
    }
    const result = await this._pg.query(query);
    if (result.rowCount) {
      throw new Error('email tidak tersedia karna telah dipakai');
    }
  }

  async getPasswordByEmail(email) {
    const query = {
      text: 'SELECT password from users where email = $1',
      values: [email],
    }
    const result = await this._pg.query(query);
    if (!result.rowCount) {
      throw new Error('email tidak ditemukan');
    }
    return result.rows[0].password;
  }

  async getIdByEmail(email) {
    const query = {
      text: 'SELECT id from users where email = $1',
      values: [email],
    }
    const result = await this._pg.query(query);
    if (!result.rowCount) {
      throw new Error('email tidak ditemukan');
    }
    return result.rows[0].id;
  }

  async updateUserById(id, payload) {
    const keys = Object.keys(payload);
    const queryFront = 'UPDATE users SET '; 
    const textMid = []
    var values = []
    keys.forEach((element, index) => {
      values.push(payload[element]);
      textMid.push(`${element} = $${index+1}`);
    });
    const textMidJoin = textMid.join(', ');
    const text = queryFront+ textMidJoin + ` WHERE id = $${keys.length+1}`;
    values.push(id);
    const query = {
      text,
      values
    }
    await this._pg.query(query);
  }
  async detailUserById(id) {
    const query = {
      text: 'SELECT * from users where id = $1',
      values: [id],
    }
    const result = await this._pg.query(query);
    if (!result.rowCount) {
      throw new Error('email tidak ditemukan');
    }
    return result.rows[0];
  }
}
module.exports = UserRepository;