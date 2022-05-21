class PredictResult {
  constructor(payload) {
    this._verifyPayload(payload);
    const { hasil: result } = payload;
    this.result = result;
  }

  _verifyPayload({ hasil: result }) {
    if (!result) {
      throw new Error('Can\'t detect that thing');
    }
    if (typeof result !== 'string') {
      throw new Error('Result must be String');
    }
  }
}

module.exports = PredictResult;