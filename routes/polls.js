var express     = require('express'),
    router      = express.Router(),
    Poll        = require('../models/poll'),
    middleware  = require('../middleware'), //Requires index.js by defauld. No need to specify it in the path
    Chart       = require('chart.js');


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
router.post('/', middleware.isLoggedIn, function(req, res){
    //Get data from the form and add it to the polls array
    var name = req.body.name;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var options = [];
    var formOptions = req.body.option;
    
    formOptions.forEach(function(option){
        if(option !== ''){
            options.push({
                name: option,
                respondents: []
            });
        }
        else{
            req.flash('error', 'Please, fill a the fields chosen by you...');
            res.redirect('back');
        }
    });
    var respondents = [];
    var newPoll = {name: name, author: author, options: options, respondents: respondents};
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
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('polls/new');
});

//SHOW route - show info about certain poll
router.get('/:id', function(req, res){
    //Find the poll with the provided ID
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            
            res.render('polls/show', {poll: foundPoll});
        }
    });
});
//EDIT route - allows user to complete the poll
router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
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
                if(foundPoll.respondents.indexOf(req.user._id) >= 0){
                    req.flash('error', 'You have already answered this poll. Go ahead and choose another one.');
                    res.redirect('/polls');
                }
                else{
                    foundPoll.respondents.push(req.user._id);
                    foundPoll.options.forEach(function(option){
                        if(option.name === req.body.optionsRadios){
                            option.respondents.push(req.user._id);
                        }
                    });
                    //foundPoll.options.respondents.push(req.user._id);
                    foundPoll.save();
                    console.log(foundPoll);
                    req.flash('success', 'Thank you for your vote!');
                    res.redirect('/polls/'+req.params.id);
                }
            }
            else{
                if(foundPoll.respondents.indexOf(req.user._id) >= 0){
                    req.flash('error', 'You have already answered this poll. Go ahead and choose another one.');
                    res.redirect('/polls');
                }
                else {
                var newOption = {
                    name: req.body.optionnew,
                    respondents: req.user._id
                };
                foundPoll.options.push(newOption);
                foundPoll.respondents.push(req.user._id);
                foundPoll.save();
                req.flash('success', 'Thank you for your vote!');
                res.redirect('/polls/'+req.params.id);
                }
            }
        }
    });
});

//DESTROY Route - delete existing poll

router.delete('/:id', middleware.checkPollOwnership, (req, res)=>{
    //Check if user is logged in
        Poll.findByIdAndRemove(req.params.id, (err)=>{
            if(err) return console.error(err);
            req.flash('success', 'Your poll was successfully deleted');
            res.redirect('/polls');
        });
});

//Chart data route
router.get('/:id/data', function(req, res){
    //Find the poll with the provided ID
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            
            res.json(foundPoll);
        }
    });
});


module.exports = router;