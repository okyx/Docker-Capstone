const Authentication = require("./Authentications");
const Authorization = require("./Authorization");
const BadRequest = require("./BadRequest");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'Can\'t empty parameter' : new BadRequest('parameter tidak boleh kosong'),
  'wrong type of parameter': new BadRequest('tipe data parameter salah'),
  'no data is sent': new BadRequest('tidak ada data yang dikirim'),
  'data type isn\'t supported': new BadRequest('tidak support extension data tersebut'),
  'please input email type format': new BadRequest('format email salah'),
  'email tidak tersedia karna telah dipakai': new BadRequest(''),
  'email tidak ditemukan': new BadRequest('tidak ada email tersebut di database'),
  'refresh token tidak ada': new BadRequest('refresh token tidak ada di database'),
  'refresh token tidak valid': new BadRequest('refresh token tidak valid'),
  'Password salah': new BadRequest('password salah'),
  'Missing authentication': new Authentication('tidak ada autentikasi'),
  'Token maximum age exceeded': new Authorization('token kadaluarsa'),
  'Invalid token signature': new Authorization('token tidak valid')
};

module.exports = DomainErrorTranslator;
