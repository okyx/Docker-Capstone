import json
import numpy as np

def getBestRecipes(ingredients):
  with open('assets\setForJaccard.json') as f:
    encodedData = json.load(f)
    
  jacardIndexes = []

  for encoded in encodedData:
    intersection = set(encoded).intersection(ingredients)
    jacardIndex = len(intersection)/len(encoded)
    jacardIndexes.append(jacardIndex)

  jacardIndexes = np.array(jacardIndexes)
  maxJaccardIndexes = np.argsort(jacardIndexes)[::-1][:5]

  return maxJaccardIndexes