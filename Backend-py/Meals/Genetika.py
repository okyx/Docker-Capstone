import numpy as np
import random

class Genetika:
  def __init__(self,pc=0.6, pm=0.05, populasi=10, data= None, keb={}):
    self.pc = pc
    self.pm = pm
    self.data = data
    self.populasi = np.random.randint(2,size=(10,5,8))
    self.keb =keb

  def fitness(self, populasi):
    raise Exception("cannot use this class directly")
  
  def rouletteWheel(self, fitness):
    prob = fitness/sum(fitness)
    cumsum = np.cumsum(prob);
    cumsum = np.insert(cumsum,0,0)
    selectedprob=[]
    selectedindex=[]
    for count in range(int(self.populasi.shape[0]*self.pc)):
      selectedprob.append(random.uniform(0,1))
    for count in range(int(self.populasi.shape[0]*self.pc)):
      for counts in range(len(cumsum)-1):
        if(cumsum[counts]<selectedprob[count] and cumsum[counts+1]>selectedprob[count]):
          selectedindex.append(counts);
          break
    selectedpopulasi = self.populasi[selectedindex]
    return selectedpopulasi

  def offspring(self, selectedpopulasi):
    for count in range(0,int(self.populasi.shape[0]*self.pc),2):
      offspring = random.randint(0,3);
      populasi1 = selectedpopulasi[count];
      populasi2 = selectedpopulasi[count+1];
      for counts in range(int(self.populasi.shape[1])):
        for a in range(7,offspring-1,-1):
          selectedpopulasi[count][counts][a] = populasi2[counts][a]
          selectedpopulasi[count+1][counts][a] = populasi1[counts][a]
      return selectedpopulasi

  def mutation(self, selectedpopulasi ):
    mut = np.random.uniform(0,1,size=(selectedpopulasi.shape))
    mutasi = np.array(np.where(mut<0.05));
    mutasi = np.transpose(mutasi)
    for mutation in range(mutasi.shape[0]):
      selectedpopulasi[mutasi[mutation][0]][mutasi[mutation][1]][mutasi[mutation][2]] = int (not selectedpopulasi[mutasi[mutation][0]][mutasi[mutation][1]][mutasi[mutation][2]])
    populasisemua = np.vstack((self.populasi,selectedpopulasi))
    return populasisemua
     
  def selection(self, populasisemua):
    arr = self.fitness(populasisemua)
    index = np.argsort(arr)[::-1]
    populasi = populasisemua[index[:10]]
    self.populasi = populasi

  def run(self, iter=100):
    for i in range(iter):
      fitness = self.fitness(self.populasi)
      roulete = self.rouletteWheel(fitness)
      offspring = self.offspring(roulete)
      mutation = self.mutation(offspring)
      self.selection(mutation)
    return self.populasi, self.fitness(self.populasi)