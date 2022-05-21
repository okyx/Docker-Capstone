const Food = require('../../domain/Predict/Food');
const tf = require('@tensorflow/tfjs-node');


class FoodPredict extends Food {
  constructor() {
    super();
  }
  async predict(image){
    const MODEL_URL = process.env.MODELPATH;
    const model = await tf.loadGraphModel(MODEL_URL);
    const result = model.predict(image);
    return result;
  }
}

module.exports = FoodPredict;