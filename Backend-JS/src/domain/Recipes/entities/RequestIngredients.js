class RequestIngredients {
  constructor(payload) {
    this._verifyPayload(payload);
    this.ingredients = payload;
  }
  _verifyPayload(payload) {
    if (typeof payload !== 'object') {
      throw new Error('wrong type of parameter');
    }
    payload.forEach(element => {
      if (typeof element !== 'number') {
        throw new Error('wrong type of parameter');
      }
    });
  }
}

module.exports = RequestIngredients;