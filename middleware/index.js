//All the middleware goes here
var Poll = require('../models/poll');

var middlewareObject = {};

middlewareObject.checkPollOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Poll.findById(req.params.id, function(err, foundPoll){
            if(err){
                res.flash('error', 'Poll was not found in the database. Check DB connection...');
                res.redirect('back');
            }
            else{
                //Check if user own a poll
                if(foundPoll.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.flash('error', 'You do not have a permission to do that');
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.flash('error', 'You have to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect("/login");
};

module.exports = middlewareObject;