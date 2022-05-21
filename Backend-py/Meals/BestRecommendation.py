import numpy as np
import re
from Meals.Genetika import Genetika

class getBestRecommendation(Genetika):
  def __init__(self,pc=0.6, pm=0.05, populasi=10, data= None, keb={}):
    super().__init__(pc, pm, populasi, data, keb)

  def fitness(self, populasi):
    fitness = np.ones(populasi.shape[0])
    for i in range(populasi.shape[0]):
      getNutrisi = {
          'Energi (Energy)': 0,
          'Protein (Protein)': 0,
          'Lemak (Fat)': 0,
          'Karbohidrat (CHO)': 0,
      }
      for j,k in enumerate(['karbo', 'daging', 'sayur', 'buah', 'kacang']):
        if j < 3:
          getIndex = round((len(self.data[k])-1) * sum([j*(2**i) for i,j in enumerate(populasi[i][j])]) / 511)
        else:
          getIndex = round((len(self.data[k])-1) * sum([j*(2**i) for i,j in enumerate(populasi[i][j])]) / 511) -1
        if getIndex == -1 :
          continue
        for l in getNutrisi.keys():
          if l in self.data[k][getIndex]['nutrisi'].keys():
            getNutrisi[l] = getNutrisi[l] + float(re.findall(r'\d+\.?\d+',self.data[k][getIndex]['nutrisi'][l])[0])
      total = 0
      for m in getNutrisi.keys():
        if m == 'Lemak (Fat)' or m == 'Karbohidrat (CHO)':
          total = total + abs(getNutrisi[m] - self.keb[m])*5
        else:
          total = total + abs(getNutrisi[m] - self.keb[m])
      fitness[i] = total
    return np.max(fitness)+ 0.5 - fitness