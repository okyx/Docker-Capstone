class MealResult {
  constructor(payload) {
    this._verifyPayload(payload)
    this.status = payload.status;
    this.data = payload.data;
  }
  
  _verifyPayload(payload) {
    if (payload.status !== 'success') {
      throw new Error('Internal Server Error');
    }
    if (typeof payload.data !== 'object') {
      throw new Error('Internal Server Error');
    }
  }
}

module.exports = MealResult;