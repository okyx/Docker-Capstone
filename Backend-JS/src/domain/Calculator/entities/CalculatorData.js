class CalculatorData {
  constructor(payload) {
    this.type = {
      sex: 'string',
      weight: 'number',
      height: 'number',
      timesOfExercise: 'number',
      age: 'number',
    };
    this._verifyPayload(payload)
    
    
    this.sex = payload.sex;
    this.weight = payload.weight;
    this.height = payload.height;
    this.timesOfExercise = this._getMultiplyOfExercise(payload.timesOfExercise);
    this.age = payload.age;
  }
  
  _verifyPayload(payload) {
    for (let key in this.type) {
      if (payload[key] === '') {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== this.type[key]) {
        throw new Error('wrong type of parameter');
      }
    }
  }

  _getMultiplyOfExercise(timesOfExercise) {
    const exercise = 1.2;
    if (timesOfExercise>0 && timesOfExercise <4) {
      return 1.375
    }
    else if (timesOfExercise>3 && timesOfExercise <6) {
      return 1.55
    }
    else if (timesOfExercise>5 && timesOfExercise <8) {
      return 1.725
    }
    else if (timesOfExercise>7) {
      return 1.9
    }
    return exercise;
  }
}

module.exports = CalculatorData;