const mongoose = require('mongoose');
const lahanSchema = mongoose.Schema({
    ktp                     : {type: String, unique: true},
    alamat_lahan 		    : String,
    kepemilikan 	        : String,
    jenis_lahan	            : String,
    luas_lahan	            : String,
    peruntukan	            : String,
    created_at              : Date,
    updated_at              : Date
});
module.exports = mongoose.model('lahan', lahanSchema);
