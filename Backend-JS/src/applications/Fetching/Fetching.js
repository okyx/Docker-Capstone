const axios = require('axios').default;
const qs = require('qs');

class Fetching {
  constructor({ url }) {
    this.url = url;
  }
  async run(payload,kind,key) {
    const response = await axios.get(this.url + kind, {
      params: payload,
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      },
      headers: {
        key:key
      }
    });
    const data = await response.data;
    return data;
  }
}

module.exports = Fetching;
