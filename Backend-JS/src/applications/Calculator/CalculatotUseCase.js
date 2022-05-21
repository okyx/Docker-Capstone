const CalculatorData = require('../../domain/Calculator/entities/CalculatorData');
const CalculatorResult = require('../../domain/Calculator/entities/CalculatorResult');

class CalculatorUseCase {
  constructor({ calculatorService }) {
    this._calculatorService = calculatorService;
  }
  execute(payload) {
    const calculatorData = new CalculatorData(payload);
    const information = this._calculatorService.calculate(calculatorData);
    const calculatorResult = new CalculatorResult(information);
    return calculatorResult._getData();
  }
}

module.exports = CalculatorUseCase;