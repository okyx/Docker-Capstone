class Calculator {
  calculate({ sex, weight, height, timesOfExercise, age }) {
    throw new Error('can\'t use this class directly');
  }
}
module.exports = Calculator;