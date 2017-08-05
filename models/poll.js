var mongoose = require('mongoose');

//SCHEMA and Model setup
var pollSchema = new mongoose.Schema({
    name: String,
    author: String,
    options: []
});

module.exports = mongoose.model('Poll', pollSchema);