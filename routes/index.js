var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');

//LANDING page route
router.get('/', function(req, res){
    res.render('landing');
});

//AUTH ROUTES
//Show registration form page
router.get('/register', (req, res) => {
    res.render('register');
});

//Handle Sign Up (registration) logic
router.post('/register', (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/polls');
        });
    });
});


//LOGIN ROUTES
//Show LOGIN form
router.get('/login', (req, res) => {
    res.render('login');
});

//Handle user's LOGIN data
router.post('/login', passport.authenticate("local", {
        successRedirect: '/polls',
        failureRedirect: '/login'
    }), function(req, res){
});

//LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//MIDDlEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
