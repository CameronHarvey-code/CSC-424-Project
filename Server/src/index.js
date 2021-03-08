
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

app.use(session({
  key: "userId",
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  }
}));


const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'app'
  });

app.post('/register', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    bcrypt.hash(password,saltRounds, (err, hash) => {

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

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false});
  }
})


app.post('/login', (req, res) => {

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

const query = 'SELECT user_password FROM user WHERE user_email = ?';



app.listen(3001, () => {
    console.log("running server");
});