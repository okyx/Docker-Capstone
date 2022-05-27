const Auth = require("../../../domain/Authentications/Auth");

class AuthRepository extends Auth {
  constructor(mongo) {
    super();
    this._mongo = mongo;
  }
  async addToken(token) {
    const insertedField = {
      token
    }
    const db = await this._mongo();
    const collection = db.collection('auths');
    await collection.insertOne(insertedField);
  }

  async checkAvailabilityToken(token) {
    const db = await this._mongo();
    const collection = db.collection('auths');
    const query = {
      token
    }
    const result= await collection.find(query).toArray();
    if (!result.length) {
      throw new Error('refresh token tidak ada');
    }
  }

  async deleteToken(token) {
    const db = await this._mongo();
    const collection = db.collection('auths');
    const query = {
      token
    }
    await collection.deleteOne(query);
  }
}

module.exports = AuthRepository;
