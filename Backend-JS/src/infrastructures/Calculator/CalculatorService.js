const Calculator = require('../../domain/Calculator/Calculator');
// https://www.mymealcatering.com/kesehatan/inilah-cara-menghitung-akg-yang-benar.html
class CalculatorService extends Calculator {
  constructor() {
    super()
  }
  calculate(payload) {
    let calculateResult = {}
    if (payload.sex === 'true') {
      const calories = (66 + (13.7 * payload.weight) + (5 * payload.height) - (6.8 * payload.age)) * payload.timesOfExercise;
      const fat = (0.15* calories)/9;
      const carbo = (0.6 * calories)/4;
      const protein = (0.15 * calories)/4;
      calculateResult = {
        calories,
        fat,
        carbo,
        protein
      }
      return calculateResult
    } else {
      const calories = (655 + (9.6 * payload.weight) + (1.8 * payload.height) - (4.7 * payload.age)) * payload.timesOfExercise;
      const fat = (0.15* calories)/9;
      const carbo = (0.6 * calories)/4;
      const protein = (0.15 * calories)/4;
      calculateResult = {
        calories,
        fat,
        carbo,
        protein
      }
      return calculateResult
    }
  }
}
module.exports = CalculatorService;