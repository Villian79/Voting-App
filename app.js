var express                 = require('express'),
    app                     = express(),
    bodyParser              = require('body-parser'),
    flash                   = require('connect-flash'),
    mongoose                = require('mongoose'),
    methodOverride          = require('method-override'),
    passport                = require('passport'),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');

var Poll    = require('./models/poll');
var User    = require('./models/user');
var seedDB  = require('./seed');

//seedDB(); //Seed the DB

var pollRoutes  = require('./routes/polls');
var indexRoutes = require('./routes/index');

//connecting to MongoDB
mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost/voting_app', {useMongoClient: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Voting App is connected to the DB');
});

app.use(flash());

//PASSPORT config
app.use(require('express-session')({
    secret: "This is my first complecated app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//Requiring ROUTES
app.use('/polls', pollRoutes);
app.use('/', indexRoutes);


app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server is listening to PORT: ' + process.env.PORT);
});