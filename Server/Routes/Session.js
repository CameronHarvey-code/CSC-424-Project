const express = require('express');
const user_session = express.Router();
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

user_session.use(express.json());

user_session.use(cors({
    origin: ("http://localhost:3000"),
    methods: ("GET", "POST"),
    credentials: true
  }));

user_session.use(cookieParser());
user_session.use(express.urlencoded({extended: true}));

user_session.use(session({            //session to keep user logged in
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 3600000,
}
}));




module.exports = user_session;

