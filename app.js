var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

//connecting to MongoDB
mongoose.connect('mongodb://localhost/voting_app', {useMongoClient: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Voting App is connected to the DB');
});
//SCHEMA and Model setup
var pollSchema = mongoose.Schema({
    name: String,
    author: String,
    options: []
});

var Poll = mongoose.model('Poll', pollSchema);
//creating a test poll example to verify that everything works fine
//=========================
/*
Poll.create({
    name: 'Who would you like to fuck tonight?',
    author: 'Incognito',
    options: ['Ting Ting', 'Kandy', 'Ira']
}, function(err, poll){
    if(err) return console.error(err);
    else{
        console.log('You have just added a new poll to the database....');
        console.log(poll);
    }
});
*/
//==========================


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Seed data to start with. Not required after DB creation
/*
var polls = [
                {name: "What soccer team is the best?", author: "Villian79"},
                {name: "What computer game is the best?", author: "Villian79"},
                {name: "What season is the best?", author: "Villian79"}
            ];
*/


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
    console.log(options);
    var newPoll = {name: name, author: author, options: options};
    console.log(req.body);
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
//SHOW route - show infor about certain poll
app.get('/polls/:id', function(req, res){
    //Find the poll with the provided ID
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err) return console.error(err);
        else{
            //Render the template page for that poll
            res.render('show', {poll: foundPoll});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server is listening to PORT: ' + process.env.PORT);
});