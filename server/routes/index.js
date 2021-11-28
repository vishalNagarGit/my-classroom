const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = require('../models/user/model');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;



// handle login with passport local scheme
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));


// registration with email and password
router.post('/register', (req, res, next) => {


    //console.log(req.body);

    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
    });

    //console.log("User");
    User.findOne({ email: req.body.email }, (err, data) => {

        if (!err && data) {
            res.status(409).send({ status: 409, msg: "user already exists" });
        }
        else {
            newUser.save()
                .then((user) => {
                  //  console.log(user);
                    res.status(200).send({ status: 200, msg: "user created" });
                })
                .catch(e =>
                    res.status(400).send({ msg: e })
                );
        }
    })



});


// check if user is already authenticated
router.get('/auth', isAuth, (req, res, next) => {
    res.status(200).json({status:200, msg: 'You made it to the route.', Authenticated: true, userId: req.user._id});
});


// handle logout 
router.get('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ msg: "user logged out successfully" });
});


router.get('/login-success', (req, res, next) => {
    res.status(200).json({ status: 200, msg: "login Success" });
});

router.get('/login-failure', (req, res, next) => {
    res.status(401).json({ status: 401, msg: "wrong username aur password" });
});

module.exports = router;