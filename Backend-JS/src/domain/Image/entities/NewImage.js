class NewImage{
  constructor(payload) {
    this._allowedType = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'];
    this._verifyPayload(payload['content-type'])
  }
  _verifyPayload(content) {
    if(! content) {
      throw new Error('no data is sent');
    }
    if (!this._allowedType.includes(content)) {
      throw new Error('data type isn\'t supported');
    }
  }
}
module.exports = NewImage;