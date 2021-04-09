const express = require('express');
const router = express.Router();
const user_session = require('../Routes/Session.js');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const queries = require('../Database/Queries.js');
const client = require('../Database/dbConn.js');

router.use(user_session);


//USER GET LOGIN ROUTER
router.get('/', (req, res) => {            
    if (req.session.user)
    {
        res.send({loggedIn: true, user: req.session.user})
    } else 
    {
        res.send({loggedIn: false});
    }
})


//USER POST LOGIN ROUTER
router.post('/', (req, res) => {           //check user is in database and password matches 
  //then login

    const email = req.body.email;
    const password = req.body.password;

    client.execute(queries.Login,
        [email],
        (err, result) => {
            if (err) 
            {
              console.log(err);
            } 
            if (result.rowLength > 0) 
            {
              bcrypt.compare(password, result.rows[0].user_password, (error, response) => {
                if (response) 
                {
                    req.session.user = result;

                    //console.log(req.session.user);
                    res.send(result)
                } else 
                {
                    res.send({message: "Wrong username/password combination!"});
                }
                });

            } else 
            {
              res.send({ message: "User doesn't exist!"});
            }
        }   
    );
});

//USER LOGOUT ROUTER
router.get('/logout', (req, res) => {
    //console.log("Cookie:", req.session);
    res.clearCookie('userId');
    req.session.destroy();
});

    //USER REGISTER ROUTER
router.post('/register', (req, res) => {     // register user in database

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userStatus = req.body.userStatus;

    bcrypt.hash(password,saltRounds, (err, hash) => {    //password encryption
        if(err) 
        {
            console.log(err);
        }   

    client.execute(queries.Register,
        [email, hash, firstName, lastName, userStatus],
        (err, result) => {
          if(err)
          {
              console.log(err);
          }
        });
    });
});

  module.exports = router;