class RecipeRecommendation {
  constructor(payload) {
    this._verifyPayload(payload);
    this.recommendation = payload;
  }
  _verifyPayload(payload) {
    if (typeof payload !== 'object') {
      throw new Error('wrong type of parameter');
    }
    payload['data'].forEach(element => {
      if (typeof element !== 'number') {
        throw new Error('wrong type of parameter');
      }
    });
  }
}

module.exports = RecipeRecommendation;