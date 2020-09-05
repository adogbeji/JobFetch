// jshint esversion:6

require("dotenv").config({path: "./config.env"});
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const axios = require("axios").default;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");

const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use("/account", express.static(`${__dirname}/public`));

// Connect Flash
app.use(flash());

// Express Session
app.use(session({
  secret: process.env.EXPRESS_SESSION_STRING,
  resave: true,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// DB Config
const db = require("./config/keys").MongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("MongoDB Connected!");
})
.catch(err => {
  console.log(err);
});

// Mongoose Model
const User = require("./models/user");

app.get("/", (req, res) => {
  res.render("home");
});

const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
