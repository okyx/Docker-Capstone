const NewImage = require('../../domain/Image/entities/NewImage');
const PredictResult = require('../../domain/Predict/entities/PredictResult');
const json = require('../../assets/models/predictFruits/labels.json');
const jsonData = Object.keys(json);
const picInformation = require('../../assets/models/predictFruits/dataFoto.json');
class ImageUseCase {
  constructor({ imageService, predictService }) {
    this._imageService = imageService;
    this._predictService = predictService;
  }
  async execute(payload) {
    new NewImage(payload.hapi.headers);
    const image = await this._imageService.fetchImage(payload);
    const result = await this._predictService.predict(image);
    const isPredicted = Math.max(...result.greater(0.7).as1D().dataSync());
    if (isPredicted) {
      const index = result.as1D().argMax().dataSync()[0];
      const hasil = jsonData[index];
      const predictResult = new PredictResult({ hasil });
      const picInformationCopy = JSON.parse(JSON.stringify(picInformation));
      const information = picInformationCopy.filter(value =>  value.nama === hasil);
      delete information[0]['nama']
      return [predictResult,information[0]];
    }else {
      throw new Error('tidak dapat memprediksi gambar');
    }
    
  }
}

module.exports = ImageUseCase;