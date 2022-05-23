class PutOldUser {
  constructor(payload) {
    this.type = {
      name: 'string',
      sex: 'boolean',
      weight: 'number',
      height: 'number',
    };
    this._verifyPayload(payload)
    
    
    this.nama = payload.name;
    this.jeniskelamin = payload.sex;
    this.berat = payload.weight
    this.tinggi = payload.height;
  }
  
  _verifyPayload(payload) {
    for (let key in this.type) {
      if (payload[key] === '') {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== this.type[key]) {
        throw new Error('wrong type of parameter');
      }
    }
  }
}

module.exports = PutOldUser;