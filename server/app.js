const express = require('express');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
const path=require('path');
var routes = require('./routes');
const teamRoute = require('./routes/team');
const quizRoute = require('./routes/quiz');
const scoreRoute = require("./routes/score");
const chatRoute = require("./routes/chat");
const connection = require('./config/database');
var cors = require("cors");
const fileUpload = require('express-fileupload');
require('./helper/socket.js')(io);



// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

// for environmen variables
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// public folder for build files from react
app.use(express.static(path.join(__dirname, 'public')));


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

// send index file from public folder 
app.get('/', (req, res, next) => {
    
            res.sendFile(`${__dirname}/index.html`, (err) => {
              if (err) {
                console.log(err);
                res.end(err.message);
              }
            });
          
    });



// import basic login signup routes from 'routes' and other routes
app.use(routes);
app.use('/team', teamRoute);
app.use('/quiz', quizRoute);
app.use('/score', scoreRoute);
app.use('/message', chatRoute);


/**
 * -------------- SERVER ----------------
 */

// default route for any non matching routes
app.get('*',function (req, res) {
  res.redirect('/');
});

server.listen(process.env.PORT||5000);

