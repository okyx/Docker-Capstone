class CalculatorResult {
  constructor(payload) {
    this.type = {
      calories: 'number',
      fat: 'number',
      protein: 'number',
      carbo: 'number',
    };
    this._verifyPayload(payload)
    
    this.calories = payload.calories;
    this.fat = payload.fat;
    this.protein = payload.protein;
    this.carbo = payload.carbo;
  }
  
  _verifyPayload(payload) {
    for (let key in payload) {
      if (!payload[key]) {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== this.type[key]) {
        throw new Error('wrong type of parameter');
      }
    }
  }

  _getData() {
    const calories = this.calories;
    const protein= this.protein;
    const carbo = this.carbo;
    const fat = this.fat;
    return {
      calories,
      fat,
      protein,
      carbo 
    }
  }
}

module.exports = CalculatorResult;