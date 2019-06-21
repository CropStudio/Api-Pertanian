const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    ktp             : {type: String, unique: true},
    firstname       : String,
    lastname 	    : String,
    username 	    : {type: String, unique: true},
    email	        : {type: String, unique: true},
    notelp	        : {type: String, unique: true},
    tgllahir        : Date,
    alamat	        : String,
    level           : String,
    password	    : String,
    api_token       : String,
    created_at      : Date,
    updated_at      : Date
});
module.exports = mongoose.model('user', userSchema);
