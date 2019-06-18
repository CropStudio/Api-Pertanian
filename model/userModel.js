const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname       : String,
    lastname 	    : String,
    username 	    : {type: String, unique: true},
    email	        : {type: String, unique: true},
    notelp	        : String,
    tgllahir        : String,
    alamat	        : String,
    level           : String,
    password	    : String,
    created_at      : Date,
    updated_at      : Date
});
module.exports = mongoose.model('user', userSchema);
