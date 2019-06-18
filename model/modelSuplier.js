const mongoose = require('mongoose');
const petaniSchema = mongoose.Schema({
    kodesup                     : {type: String, unique: true},
    namasup 		            : String,
    penanggung_jawab 	        : String,
    alamat	                    : String,
    notelp	                    : String,
    created_at                  : Date,
    updated_at                  : Date
});
module.exports = mongoose.model('supplier', petaniSchema);
