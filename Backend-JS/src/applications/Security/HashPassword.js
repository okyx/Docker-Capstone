class PasswordHash {
  async hash(password) {
    throw new Error('Cant use this class directly');
  }
  async validatePassowrd(password, hashedPassword) {
    throw new Error('Cant use this class directly');
  }
}

module.exports = PasswordHash;