class MealData {
  constructor(payload) {
    this._verifyPayload(payload)
    this.calories = payload.calories
    this.carbo = payload.fat;
    this.lemak = payload.protein;
    this.protein = payload.carbo;
    this.payload = {
      'Energi (Energy)': this.calories,
      'Karbohidrat (CHO)': this.carbo,
      'Lemak (Fat)': this.lemak,
      'Protein (Protein)': this.protein,
    }
  }
  
  _verifyPayload(payload) {
    for (let key in this.type) {
      if (payload[key] === '') {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== 'number') {
        throw new Error('wrong type of parameter');
      }
    }
  }
}

module.exports = MealData;