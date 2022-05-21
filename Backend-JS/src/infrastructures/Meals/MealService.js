const Meals = require("../../domain/Meals/Meals");

class MealService extends Meals {
  constructor(fetching) {
    super();
    this.fetching = fetching;
  }
  async bestMeals(payload) {
    const response = this.fetching.run(payload,'Meals', process.env.MealKey);
    return response;
  }
}

module.exports = MealService;