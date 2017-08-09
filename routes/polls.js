var express     = require('express'),
    router      = express.Router(),
    Poll        = require('../models/poll');


//APP ROUTES
//INDEX route - show all the polls
router.get('/', function(req, res){
    //Get all the polls from DB
    Poll.find({}, (err, polls)=>{
        if(err) return console.error(err);
        else{
            res.render('polls/index', {polls: polls, currentUser: req.user});
        }
    });
});

//CREATE route - add new poll to DB
router.post('/', isLoggedIn, function(req, res){
    //Get data from the form and add it to the polls array
    var name = req.body.name;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var options = [option1, option2];
    var newPoll = {name: name, author: author, options: options};
    //Create a new poll and add it to the database
    
    Poll.create(newPoll, function(err, poll){
        if(err) return console.error(err);
        else{
            console.log('New POLL has been added...');
        }
    });
    //Redirect to polls page
    res.redirect('/polls');
    
});
//NEW route - show the form to create a new poll
router.get('/new', isLoggedIn, function(req, res){
    res.render('polls/new');
});

//SHOW route - show info about certain poll
router.get('/:id', function(req, res){
    //Find the poll with the provided ID
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            //Render the template page for that poll
            res.render('polls/show', {poll: foundPoll});
        }
    });
});
//EDIT route - allows user to complete the poll
router.get('/:id/edit', isLoggedIn, function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            //Render the template page for that poll
            res.render('polls/poll', {poll: foundPoll});
        }
    });
});

//UPDATE Route to post a POLL response from the user
router.put('/:id', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            if(req.body.optionnew === ''){
                res.redirect('/polls/'+req.params.id);
            }
            else{
                foundPoll.options.push(req.body.optionnew);
                foundPoll.save();
                res.redirect('/polls/'+req.params.id);
            }
        }
    });
});

//DESTROY Route - delete existing poll

router.delete('/:id', checkPollOwnership, (req, res)=>{
    //Check if user is logged in
        Poll.findByIdAndRemove(req.params.id, (err)=>{
            if(err) return console.error(err);
            res.redirect('/polls');
        });
});



//================MIDDLEWARE functions======================

//MIDDlEWARE - authentification
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//MIDDLEWARE - authorisation
function checkPollOwnership(req, res, next){
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
}
//==========END OF MIDDLEWARE===============================

module.exports = router;