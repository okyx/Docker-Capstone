class PredictResult {
  constructor(payload) {
    this._verifyPayload(payload);
    const { hasil: result } = payload;
    this.result = result;
  }

  _verifyPayload({ hasil: result }) {
    if (!result) {
      throw new Error();
    }
    if (typeof result !== 'string') {
      throw new Error();
    }
  }
}

module.exports = PredictResult;