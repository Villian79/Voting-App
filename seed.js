var mongoose    = require('mongoose');
var Poll        = require('./models/poll');

//Seed data
var data = [
                {
                    name: "What soccer team is the best?", 
                    author: "Villian79", 
                    options: ["Barcelona", "Real Madrid"]
                },
                {
                    name: "What computer is the best?", 
                    author: "Villian79", 
                    options: ["Apple", "Asus"]
                },
                {
                    name: "What season is the best?", 
                    author: "Villian79", 
                    options: ["Summer", "Winter"]
                }
            ];

function seedDB() {
    //Remove all polls
    Poll.remove({}, function(err){
        if(err) return console.error(err);
        else{
            console.log('Removed all polls!');
            //Create a few polls using seeded data
            
            data.forEach(function(seed){
                Poll.create(seed, function(err, poll){
                    if(err) return console.error(err);
                    else{
                    console.log('Added a new POLL');
                    }
                });
            });
        }
    });
}
module.exports = seedDB;