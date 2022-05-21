const MealData = require('../../domain/Meals/entities/MealData');
const MealResult = require('../../domain/Meals/entities/MealResult');

class MealUseCase {
  constructor({ calculatorUseCase, mealService }) {
    this._calculatorUseCase = calculatorUseCase;
    this._mealService = mealService;
  }
  async execute(payload) {
    const time = [0.3,0.5,0.2];
    const information = this._calculatorUseCase.execute(payload)
    const payloads = new MealData(information).payload;
    var timePayload = []
    const timeString = ['pagi','siang','malam']
    var informations = {}
    time.forEach(element => {
        let kalori = payloads['Energi (Energy)'] * element;
        let karbo = payloads['Karbohidrat (CHO)'] * element;
        let lemak = payloads['Lemak (Fat)'] * element;
        let protein = payloads['Protein (Protein)'] * element;
      timePayload.push({
        'Energi (Energy)' : kalori,
        'Karbohidrat (CHO)' : karbo,
        'Lemak (Fat)' : lemak,
        'Protein (Protein)': protein
      })
    })
    for (let i = 0; i<3 ; i++) {
      const bestMeal = await this._mealService.bestMeals(timePayload[i]);
      const bestMealRecommendation = new MealResult(bestMeal);
      informations[timeString[i]] = bestMealRecommendation.data
    }
    return informations;
  }
}

module.exports = MealUseCase;