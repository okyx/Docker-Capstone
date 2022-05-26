const Recipes = require("../../domain/Recipes/Recipe");

class RecipesService extends Recipes {
  constructor(fetching) {
    super();
    this.fetching = fetching;
  }
  async recommendation(payload) {
    const response = this.fetching.run(payload,'Recipes', process.env.RecipesKey);
    return response;
  }
}

module.exports = RecipesService;
