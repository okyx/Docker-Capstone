const RecipeRecommendation = require('../../domain/Recipes/entities/RecipeRecommendation');
const RequestIngredients = require('../../domain/Recipes/entities/RequestIngredients');

class RecipeUseCase {
  constructor({recipeService }) {
    this._recipeService = recipeService;
  }
  async execute(payload) {
    const ingredients = new RequestIngredients(payload);
    const information = await this._recipeService.recommendation({...ingredients})
    const bestRecipeRecommendation = new RecipeRecommendation(information)
    return bestRecipeRecommendation;
  }
}

module.exports = RecipeUseCase;