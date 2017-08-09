var mongoose = require('mongoose');

//SCHEMA and Model setup
var pollSchema = new mongoose.Schema({
    name: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    options: []
});

module.exports = mongoose.model('Poll', pollSchema);