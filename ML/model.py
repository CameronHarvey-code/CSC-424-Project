import os
import math
import torch
from torch import nn
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
my_file = os.path.join(THIS_FOLDER, 'All_Events.csv')
data_frame = pd.read_csv(my_file)

data_frame = data_frame.drop(['ENG - Worship Experience','Miércoles: Noche de Adoración', 'ENG-Kids Ministry', 'ENG - Vida Steps'], axis=1)

data_frame['Dates'] = pd.to_datetime(data_frame['Dates'])

data_frame['Dates'] = (data_frame['Dates'] - pd.Timestamp('1970-01-01'))/ pd.Timedelta('1S')

date_min = data_frame['Dates'].min()
date_max = data_frame['Dates'].max()

total_min = data_frame['TOTAL'].min()
total_max = data_frame['TOTAL'].max()

data_frame['Dates'] = (data_frame['Dates'] - date_min) / (date_max - date_min)

data_frame['TOTAL'] = (data_frame['TOTAL'] - total_min) / (total_max - total_min)

data_frame['ONES'] = np.ones(len(data_frame))

y_true = torch.tensor(data_frame['TOTAL'].to_numpy()) 

x = torch.tensor(data_frame['Dates'].to_numpy())
torch.unsqueeze(x, 1)

# N is batch size; D_in is input dimension;
# H is hidden dimension; D_out is output dimension.
N, D_in, H, D_out = 43, 1, 10, 1

# Create random Tensors to hold inputs and outputs
x = torch.tensor(data_frame['Dates'].to_numpy())
torch.unsqueeze(x, 1)
print(x)
y = y_true
y = y.float()

model = Model()

# The nn package also contains definitions of popular loss functions; in this
# case we will use Mean Squared Error (MSE) as our loss function.
loss_fn = torch.nn.MSELoss(reduction='sum')

learning_rate = 1e-4

optimizer = torch.optim.SGD(model.parameters(), lr = learning_rate)

y_pred = None
for t in range(40000):
    # Forward pass: compute predicted y by passing x to the model. Module objects
    # override the __call__ operator so you can call them like functions. When
    # doing so you pass a Tensor of input data to the Module and it produces
    # a Tensor of output data.
    y_pred = model(x)
    
    y_pred = torch.squeeze(y_pred, 1)

    # Compute and print loss. We pass Tensors containing the predicted and true
    # values of y, and the loss function returns a Tensor containing the
    # loss.
    loss = loss_fn(y_pred, y)
    
    #if t % 100 == 99:
    #    print(t, loss.item())

    # Zero the gradients before running the backward pass.
    model.zero_grad()

    # Backward pass: compute gradient of the loss with respect to all the learnable
    # parameters of the model. Internally, the parameters of each Module are stored
    # in Tensors with requires_grad=True, so this call will compute gradients for
    # all learnable parameters in the model.
    loss.backward()
    
   
    
    # Update the weights using gradient descent. Each parameter is a Tensor, so
    # we can access its gradients like we did before.
    optimizer.step()

#yp = torch.squeeze(y_pred, 1).detach()

yp = y_pred.detach()
e = y_true - yp
print(torch.sqrt(torch.sum(e*e)), loss_fn(yp, y))
data_frame["y_pred"] = yp.numpy()
data_frame.plot(x = "Dates", y = ["TOTAL","y_pred"], style=['o', '-'])

x = torch.tensor(data_frame['Dates'].to_numpy())
#torch.unsqueeze(x, 1)

model = Model()
y_pred = model(x)

#y_pred_min = data_frame['y_pred'].min()
#y_pred_max = data_frame['y_pred'].min()

#bring back the original values (the unnormalized data)
data_frame['y_pred'] = data_frame['y_pred'] * (total_max - total_min) + total_min
data_frame['TOTAL'] = data_frame['TOTAL'] * (total_max - total_min) + total_min
data_frame['Dates'] = data_frame['Dates'] * (date_max - date_min) + date_min

#calculate back the dates
data_frame['Dates'] = data_frame['Dates'] * pd.Timedelta('1S') + pd.Timestamp('1970-01-01')

data_frame.plot(x = "Dates", y = ["TOTAL","y_pred"], style=['o', '-'])

l = [model, date_min, date_max, total_min, total_max]


THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
my_file = os.path.join(THIS_FOLDER, 'model_test')

with open(my_file, 'wb') as f:
    pickle.dump(l, f)