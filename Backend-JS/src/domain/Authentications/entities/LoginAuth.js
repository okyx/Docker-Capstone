const NewUser = require("../../User/entities/NewUser");

class LoginAuth extends NewUser{
  constructor(payload) {
    super(payload);
  }
}
module.exports = LoginAuth;