var mongoose = require('mongoose');

//User SCHEMA and Model Setup
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    responses: []  //Here should be located id's of polls completed by the user
});

module.exports = mongoose.model('User', userSchema);