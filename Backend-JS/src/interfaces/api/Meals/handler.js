const Fetching = require('../../../applications/Fetching/Fetching');
const MealUseCase = require('../../../applications/Meals/MealUseCase')

class MealHandler {
  constructor(container) {
    this._container = container;
    this.getBestMealHandler = this.getBestMealHandler.bind(this);
  }
  async getBestMealHandler(request) {
    var { id:payload } = request.auth.credentials;
    if (request.query['weight']) {
      payload = request.query;
      payload['weight'] = parseInt(payload['weight'])
      payload['height'] = parseInt(payload['height'])
      payload['timesOfExercise'] = parseInt(payload['timesOfExercise'])
      payload['age'] = parseInt(payload['age'])
    }   
    const mealUseCase = this._container.getInstance(MealUseCase.name)
    const information = await mealUseCase.execute(payload)
    return {
      status: 'success',
      information
    };
  }
}

module.exports = MealHandler;