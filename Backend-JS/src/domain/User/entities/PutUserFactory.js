const PutNewUser = require("./PutNewUser");
const PutOldUser = require("./PutOldUser");

class PutUserFactory {
  factory(isRegister, payload) {
    if (isRegister) {
      return new PutNewUser(payload);
    }
      return new PutOldUser(payload);
  }
};
module.exports = PutUserFactory;