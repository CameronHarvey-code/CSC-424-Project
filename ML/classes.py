import math
import torch
from torch import nn
import pandas as pd
import numpy as np
import time
import datetime
import pickle

from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
from sklearn import preprocessing
#from keras.models import Sequential
#from keras.layers import Dense, LSTM
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
plt.style.use('fivethirtyeight')
#!python --version


class Model(nn.Module):
    def __init__ (self):
        super(Model, self).__init__()
        self.N, self.D_in, self.H, self.D_out = 43, 1, 10, 1
        self.lin1 = torch.nn.Linear(self.D_in, self.H)
        self.rel1 = torch.nn.ReLU()
        self.lin2 = torch.nn.Linear(self.H, self.D_out)
        
    def forward(self, x):
        
        x = x.float()
        x = self.lin1(torch.unsqueeze(x, 1))
        x = self.rel1(x)
        x = self.lin2(x)
        return x