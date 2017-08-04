# Voting-App
Freecodecamp back-end challenges. API projects. Challenge name: "Build a Voting App"

*Add Landing Page
*Add Polls Page which lists all the polls available
All polls are an array of objects with the following structure:
[
  {
      name: "What soccer team do you like?",
      author: "Villian79"
  }
]
----------------------------------------------------------------------------------------

# Layout & Basic Styling
*Create Header and Footer partials
*Add in Bootstrap
----------------------------------------------------------------------------------------

# Creatin a NEW poll
*Set up a new POST poll route: <app.post('/polls')>
*Add-in body-parser
*Set up route to show form: <app.get('/polls/new')>
*Add basic unstyled form: <views/new.ejs>
*Redirect to polls page: <res.redirect('/polls')>. By default it's a GET request
----------------------------------------------------------------------------------------

# Style the polls page
*Add a better header/title
*Display polls in a grid
----------------------------------------------------------------------------------------

# Style the app
*Add a nav bar using bootstrap
*Style the new poll form
----------------------------------------------------------------------------------------

# MongoDB connection
*Add mongoose.js. 
    - To close the 'mpromise' warning: after mongoose.connect write: mongoose.Promise = global.Promise;
    - To close the 'useMongoClient' warning: mongoose.connect('mongodb://localhost/voting_app', {useMongoClient: true});
*Create Schema for polls and users
*Connect to DB
----------------------------------------------------------------------------------------

# SHOW page
*Review RESTful routes
*Add options to our polls
name           path         request    description
============================================================================
INDEX route   /polls          GET      Display the list of all polls
NEW route     /polls/new      GET      Display the form to create a new poll
CREATE route  /polls          POST     Add a new poll to the DB
SHOW route    /polls/:id      GET      Show info about one poll



============================================================================
#Make the app modular.
*Create user and poll models
