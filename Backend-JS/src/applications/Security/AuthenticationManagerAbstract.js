class AuthenticationManagerAbstract {
  async createAccessToken(payload) {
    throw new Error('Cant use this class directly');
  }
  async createRefreshToken(payload) {
    throw new Error('Cant use this class directly');
    
  }
  async verifyRefreshToken(payload) {
    throw new Error('Cant use this class directly');
    
  }
  async decode(payload) {
    throw new Error('Cant use this class directly');
  }
}

module.exports= AuthenticationManagerAbstract;