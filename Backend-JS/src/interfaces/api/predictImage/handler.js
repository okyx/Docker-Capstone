const ImageUseCase = require('../../../applications/predict/ImageUseCase');

class PredictHandler {
  constructor(container) {
    this._container = container;
    this.postPredictImage = this.postPredictImage.bind(this);
  }
  async postPredictImage(request) {
    const { file } = request.payload;
    const imageUseCase =  this._container.getInstance(ImageUseCase.name);
    const prediksi = await imageUseCase.execute(file);
    return {
      status: 'success',
      name: prediksi[0]['result'],
      information: prediksi[1]
    }
  }
}

module.exports = PredictHandler;