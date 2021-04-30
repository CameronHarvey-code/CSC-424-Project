const user = require('../Routes/User');
const user_session = require('../Routes/Session');
const events = require('../Routes/Events');
const express = require("express");


const app = express();

const PORT = process.env.port || 3001;

//USER SESSION CREATE (Please refer to ../Routes/Session.js)
app.use(user_session);

//---------------------USER METHODS---------------------
//--------(---Please refer to ../Routes/User)-----------

//USER REGISTER METHOD (POST)
app.post('/register', user);
//USER LOGIN METHOD  (GET, POST)
app.use('/login', user);
//USER LOGOUT METHOD  (GET)
app.get('/logout', user);

//--------------------EVENTS METHODS--------------------
//---------(Please refer to ../Routes/Events)-----------

//ADD EVENT METHOD (POST)
app.post('/addEvent', events);
//DELETE EVENT METHOD (POST)
app.post('/deleteEvent', events);
//EVENT DISPLAY METHOD (POST)
app.get('/eventDisplay', events);
//UPDATE EVENT METHOD (POST)
app.post('/updateAttendance', events);
//WRITE DATE TO FILE
app.post('/predict', events);

//SERVER RUNNING
app.listen(PORT, () => {
    console.log("running server");
});
