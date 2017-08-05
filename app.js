var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');

var Poll = require('./models/poll');
var User = require('./models/user');
var seedDB = require('./seed');

seedDB();

//connecting to MongoDB
mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost/voting_app', {useMongoClient: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Voting App is connected to the DB');
});

//Config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//LANDING page route
app.get('/', function(req, res){
    res.render('landing');
});

//INDEX route - show all the polls
app.get('/polls', function(req, res){
    //Get all the polls from DB
    Poll.find({}, (err, polls)=>{
        if(err) return console.error(err);
        else{
            res.render('index', {polls: polls});
        }
    });
});

//CREATE route - add new poll to DB
app.post('/polls', function(req, res){
    //Get data from the form and add it to the polls array
    var name = req.body.name;
    var author = req.body.author;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var options = [option1, option2];
    var newPoll = {name: name, author: author, options: options};
    //Create a new poll and add it to the database
    Poll.create(newPoll, function(err, poll){
        if(err) return console.error(err);
        else{
            console.log('New POLL has been added...');
            console.log(poll);
        }
    });
    //Redirect to polls page
    res.redirect('/polls');
    
});
//NEW route - show the form to create a new poll
app.get('/polls/new', function(req, res){
    res.render('new');
});

//SHOW route - show info about certain poll
app.get('/polls/:id', function(req, res){
    //Find the poll with the provided ID
    console.log(req.params.id);
    
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            //Render the template page for that poll
            console.log(foundPoll);
            res.render('show', {poll: foundPoll});
        }
    });
});
//=============================================================
app.get('/polls/:id/edit', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            //Render the template page for that poll
            res.render('poll', {poll: foundPoll});
        }
    });
});
//=============================================================
//UPDATE Route to post a POLL response from the user
app.put('/polls/:id', function(req, res){
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            if(req.body.optionnew === ''){
                res.redirect('/polls/'+req.params.id);
            }
            else{
                foundPoll.options.push(req.body.optionnew);
                foundPoll.save();
                console.log(foundPoll);
                res.redirect('/polls/'+req.params.id);
            }
        }
    });
});

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server is listening to PORT: ' + process.env.PORT);
});