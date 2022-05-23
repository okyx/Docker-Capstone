class User {
  async addUser(payload) {
    throw new Error('Cant use this class directly');
  }
  async verifyAvailableEmail(email) {
    throw new Error('Cant use this class directly');
  }
  async getPasswordByEmail(email) {
    throw new Error('Cant use this class directly');
  }
  async getIdByEmail(email) {
    throw new Error('Cant use this class directly');
  }
  async updateUserById(id) {
    throw new Error('Cant use this class directly');
  }
  async detailUserById(id) {
    throw new Error('Cant use this class directly');
  }
}
module.exports = User;