class NewUser {
  constructor(payload) {
    this._verifyPayload(payload);
    this.email =  payload.email;
    this.password = payload.password;
    this._re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
  }
  _verifyPayload({ email, password }) {
    if (!email || !password) {
      throw new Error('Can\'t empty parameter');
    }
    if(typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('wrong type of parameter');
    }
    if(!email.match(this._re)) {
      throw new Error('please input email type format');
    }
  }
}
module.exports = NewUser;