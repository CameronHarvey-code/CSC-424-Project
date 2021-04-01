const cassandra = require("cassandra-driver");
const express = require("express");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors({
  origin: ("http://localhost:3000"),
  methods: ("GET", "POST"),
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({            //session to keep user logged in
  key: "userId",
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  }
}));


const client = new cassandra.Client({         //Connects to cassandra
    contactPoints: ['127.0.0.1'],             //replace with ip to cassandra database
    localDataCenter: 'datacenter1',
    keyspace: 'app'                           //keyspace name here
  });

app.post('/register', (req, res) => {     // register user in database

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    bcrypt.hash(password,saltRounds, (err, hash) => {    //password encryption

      if (err) {
        console.log(err);
      }

    

    client.execute("INSERT INTO user (user_email, user_password, user_firstname, user_lastname) VALUES (?,?,?,?)",
    [email, hash, firstName, lastName],
    (err, result) => {
      console.log(err);
    });

});
});

app.get('/login', (req, res) => {            //
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false});
  }
})


app.post('/login', (req, res) => {           //check user is in database and password matches 
                                             //then login

    const email = req.body.email;
    const password = req.body.password;

    client.execute("SELECT * FROM user WHERE user_email = ? ",
    [email],
    (err, result) => {
      if (err) {
      console.log(err);
      } 

      console.log(result);

      if (result.rowLength > 0) {
          bcrypt.compare(password, result.rows[0].user_password, (error, response) => {
            if (response) {
              req.session.user = result;

              

              console.log(req.session.user);
              res.send(result)
            } else {
              res.send({message: "Wrong username/password combination!"});
            }
          } );

      } else {
          res.send({ message: "User doesn't exist!"});
        }
      }

    );
});

app.post('/addEvent', (req, res) => {

  const date = req.body.date;
  const event = req.body.event;

  client.execute("INSERT INTO events (event_name, event_date) VALUES (?,?)",
    [event, date],
    (err, result) => {
      console.log(err);
    });
})

app.get('/logout', (req, res) => {
  console.log("Cookie:", req.cookies);
  res.clearCookie('userId');
  req.clearCookie('userId');

});

app.get('/eventDisplay', (req, res) => {
  client.execute("SELECT * FROM events",
  (err, result) => {
    console.log("Event Display:", result);
    res.send(result);
  });
  
});

app.post('/updateAttendance', (req, res) => {
  const attendance = req.body.attendance;
  const name = req.body.name;
  const date = req.body.date;
  console.log(req.body.name);
  console.log(req.body.date);
  console.log(req.body.attendance);
  client.execute("UPDATE events SET event_attendance = ? WHERE event_name = ? AND event_date = ?",
  [attendance, name, date], {prepare : true},
  (err, result) => {
   
    console.log(err);
  });
  
});


const query = 'SELECT user_password FROM user WHERE user_email = ?';



app.listen(3001, () => {
    console.log("running server");
});
