const mongoose = require('mongoose');
const pupukSchema = mongoose.Schema({
    kode        : {type: String, unique: true},
    nama_pupuk 	: String,
    jenis_pupuk : String,
    harga 	    : String,
    tipe 	    : String,
    created_at  : Date,
    updated_at  : Date
});
module.exports = mongoose.model('pupuk', pupukSchema);
