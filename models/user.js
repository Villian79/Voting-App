var mongoose                = require('mongoose');
var passportLocalMongoose   = require('passport-local-mongoose');

//User SCHEMA and Model Setup
var userSchema = new mongoose.Schema({
    name: String,
    //email: String,
    password: String,
    //responses: []  //Here should be located id's of polls completed by the user
});

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);