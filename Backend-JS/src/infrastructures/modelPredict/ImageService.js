const Image = require('../../domain/Image/Image');
const tfnode = require('@tensorflow/tfjs-node');

class ImageService extends Image {
  constructor() {
    super();
  }
  async fetchImage(payload) {
    const readImage = () => {
      const tfimage = tfnode.node.decodeImage(payload._data,3);
      return tfimage.resizeBilinear([250,250]).expandDims(0);
    }
    const results =  readImage();
    const result = results.div(255)
    return result;
  }
}
module.exports = ImageService;