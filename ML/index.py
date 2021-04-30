import os
import math
import torch
import pandas as pd
import numpy as np
import time
import datetime
import pickle
import classes
from classes import Model
from torch import nn
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from sklearn import preprocessing
#from keras.models import Sequential
#from keras.layers import Dense, LSTM
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
plt.style.use('fivethirtyeight')

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'model_test')

with open(my_file, 'rb') as f:
    model = pickle.load(f)

t = pd.to_datetime("2021-06-03", format="%Y-%m-%d")

t = (t - pd.Timestamp('1970-01-01'))/ pd.Timedelta('1S')
ct = t
t = (t - model[1]) / (model[2] - model[1])

test = torch.tensor(t)
test = torch.unsqueeze(test, 0)

tp = model[0](test)

tp = tp * (model[4] - model[3]) + model[3]
t = (ct * pd.Timedelta('1S')) + pd.Timestamp('1970-01-01')

tp = tp.detach().numpy()

tp = round(tp[0,0])

plt.xticks(rotation=90)
plt.plot(t, tp, 'go')

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'prediction.txt')

prediction = open(my_file,"w")

tp = str(tp)
print('Predicted Attendance: ',tp)

prediction.write(tp)

prediction.close()