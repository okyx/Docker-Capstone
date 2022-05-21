const RecipeUseCase = require("../../../applications/Recipes/RecipeUseCase");

class RecipeHandler {
  constructor(container) {
    this._container = container;
    this.getBestRecipesHandler = this.getBestRecipesHandler.bind(this);
  }
  getBestRecipesHandler(request) {
    const params = request.query;
    const payload = params['ingredients'].map((number) => parseInt(number));
    const recipeUseCase = this._container.getInstance(RecipeUseCase.name)
    const information = recipeUseCase.execute(payload);
    return information
  }
}
module.exports = RecipeHandler;