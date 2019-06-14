const mongoose = require('mongoose');
const petaniSchema = mongoose.Schema({
    ktp                     : {type: String, unique: true},
    nama 		            : String,
    tempat_lahir 	        : String,
    tanggal_lahir	        : Date,
    jenis_kelamin	        : String,
    pendidikan              : String,
    status_keluarga	        : String,
    alamat                  : String,
    no_hp	                : String,
    nama_kelompok_petani    : String,
    created_at              : Date,
    updated_at              : Date
});
module.exports = mongoose.model('petani', petaniSchema);
