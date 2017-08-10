//All the middleware goes here
var Poll = require('../models/poll');

var middlewareObject = {};

middlewareObject.checkPollOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Poll.findById(req.params.id, function(err, foundPoll){
            if(err){
                res.redirect('back');
            }
            else{
                //Check if user own a poll
                if(foundPoll.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.redirect('back');
    }
};

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObject;