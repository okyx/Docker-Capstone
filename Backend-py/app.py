import json
from flask import Flask, request, jsonify, Response
from Meals.BestRecommendation import getBestRecommendation as recommendation
from Recipes.RecipeRecommendation import getBestRecipes
from decouple import config
Mealkey = config('MEALKEY')
Recipekey = config('RECIPEKEY')
app = Flask(__name__)

@app.route('/Meals', methods=['GET'])
def MealRecommendation():
  if request.headers.get('key') == Mealkey:
    keb = request.args.to_dict()
    keb = {i:float(k) for i,k in keb.items()}
    with open('assets/dataMeal.json') as f:
      dataOlahanJadi = json.load(f)
    with open('assets/dataMealUngrouping.json') as f:
      dataAkhir = json.load(f)
    a = recommendation(data = dataOlahanJadi, keb=keb)
    pol,_ = a.run()
    polu = pol[0]
    polu = polu.reshape(1,5,8)
    counter = 0
    listAkhir = []
    for i,j in enumerate(['karbo', 'daging', 'sayur', 'buah', 'kacang']):
      if i < 3:
        getIndex = round((len(dataOlahanJadi[j])-1) * sum([j*(2**i) for i,j in enumerate(polu[0][i])]) / 511)
      else:
        getIndex = round((len(dataOlahanJadi[j])-1) * sum([j*(2**i) for i,j in enumerate(polu[0][i])]) / 511) -1
      if getIndex == -1 :
        listAkhir.append(-1)
        continue
      indexs = counter + getIndex
      listAkhir.append(indexs)
      counter = counter + len(dataOlahanJadi[j])
    JsonBack = []
    for i in listAkhir:
      singleAttr = {}
      getAttr = dataAkhir[i]
      singleAttr['Nama'] = getAttr['Nama']
      singleAttr['Energi (Energy)'] = getAttr['nutrisi']['Energi (Energy)']
      singleAttr['Karbohidrat (CHO)'] = getAttr['nutrisi']['Karbohidrat (CHO)']
      singleAttr['Lemak (Fat)'] = getAttr['nutrisi']['Lemak (Fat)']
      singleAttr['Protein (Protein)'] = getAttr['nutrisi']['Protein (Protein)']
      singleAttr['pic'] = ''
      JsonBack.append(singleAttr)
      returning = {
        "status": 'success',
        "data": JsonBack
      }
    return jsonify(returning)
  else:
    return Response("{'status':'error','message':'tidak ada hak akses'}", status=400, mimetype='application/json')


@app.route('/Recipes', methods=['GET'])
def RecipeRecommendation():
  if request.headers.get('key') == Recipekey:
    ingredientsList = request.args.getlist('ingredients')
    ingredient = set([int(i) for i in ingredientsList])
    jaccard = getBestRecipes(ingredient)
    returning = {
        "status": 'success',
        "data": jaccard.tolist()
      }
    return jsonify(returning)
  else:
    return Response("{'status':'error','message':'tidak ada hak akses'}", status=400, mimetype='application/json')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)
