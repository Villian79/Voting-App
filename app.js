var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


var polls = [
                {name: "What soccer team is the best?", author: "Villian79"},
                {name: "What computer game is the best?", author: "Villian79"},
                {name: "What season is the best?", author: "Villian79"}
            ];


app.get('/', function(req, res){
    res.render('landing');
});

app.get('/polls', function(req, res){
    res.render('polls', {polls: polls});
});

app.post('/polls', function(req, res){
    //Get data from the form and add it to the polls array
    var name = req.body.name;
    var author = req.body.author;
    var newPoll = {name: name, author: author};
    polls.push(newPoll);
    //Redirect to polls page
    res.redirect('/polls');
    
});

app.get('/polls/new', function(req, res){
    res.render('new');
});


app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server is listening to PORT: ' + process.env.PORT);
});