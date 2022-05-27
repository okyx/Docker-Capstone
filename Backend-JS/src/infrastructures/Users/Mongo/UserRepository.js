const User = require('../../../domain/User/User');

class UserRepository extends User {
  constructor(mongo, generator) {
    super();
    this._mongo = mongo;
    this._generator = generator;
  }

  async addUser(payload) {
    const { email, password } = payload;
    const id = `user-${this._generator(48)}`;
    const insertedField = {
      _id:id,
      email,
      password
    }
    const db = await this._mongo();
    const collection = db.collection('users');
    const insertedOne = await collection.insertOne(insertedField);
    return insertedOne['insertedId'];
  }

  async verifyAvailableEmail(email) {
    const db = await this._mongo();
    const collection = db.collection('users');
    const query = {
      email
    }
    const result= await collection.find(query).toArray();
    if (result.length) {
      throw new Error('email tidak tersedia karna telah dipakai');
    }
  }

  async getPasswordByEmail(email) {
    const db = await this._mongo();
    const collection = db.collection('users');
    const query = {
      email
    }
    const result = await collection.find(query, {
      password:1
    }).toArray();
    if (!result.length) {
      throw new Error('email tidak ditemukan');
    }
    return result[0].password;
  }

  async getIdByEmail(email) {
    const db = await this._mongo();
    const collection = db.collection('users');
    const query = {
      email
    }
    const result = await collection.find(query, {
      password:1
    }).toArray();
    if (!result.length) {
      throw new Error('email tidak ditemukan');
    }
    return result[0]._id;
  }

  async updateUserById(id, payload) {
    const db = await this._mongo();
    const collection = db.collection('users');
    const filter = {
      _id:id
    }
    const payloads = {
      $set: {...payload}
    }
    await collection.updateOne(filter,payloads);
  }
  async detailUserById(id) {
    const db = await this._mongo();
    const collection = db.collection('users');
    const query = {
      _id:id
    }
    const result = await collection.find(query).toArray();
    if (!result.length) {
      throw new Error('email tidak ditemukan');
    }
    return result[0]
  }
}
module.exports = UserRepository;
