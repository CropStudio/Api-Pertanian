'use strict';

const petaniController = require('../controller/petaniController')
const cekLogin      = require('../controller/cekUsersLogin')

module.exports = router => {

    //input data petani
    router.post('/petani', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const ktp                   = req.body.ktp;
            const nama 		            = req.body.nama;
            const tempat_lahir 	        = req.body.tempat_lahir;
            const tanggal_lahir	        = req.body.tanggal_lahir;
            const jenis_kelamin	        = req.body.jenis_kelamin;
            const pendidikan            = req.body.pendidikan;
            const status_keluarga	    = req.body.status_keluarga;
            const alamat                = req.body.alamat;
            const no_hp	                = req.body.no_hp;
            const nama_kelompok_petani  = req.body.namakelopoktani;

            if (!ktp || !nama || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !pendidikan || !status_keluarga || !alamat || !no_hp || !nama_kelompok_petani
                ||!ktp.trim() || !nama.trim() || !tempat_lahir.trim() || !tanggal_lahir.trim() || !jenis_kelamin.trim() || !pendidikan.trim()
                || !status_keluarga.trim() || !alamat.trim() || !no_hp.trim() || !nama_kelompok_petani.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                petaniController.inputBiodata(ktp,nama,tempat_lahir,tanggal_lahir,jenis_kelamin,pendidikan,status_keluarga,alamat,no_hp,nama_kelompok_petani)

                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //get data petani
    router.get('/petani', (req, res) => {
        if(cekLogin.checkToken(req)) {
            petaniController.dataPetani()
                .then(result => {
                    console.log(result)
                    res.status(result.status).json({status: true, message: result.message})
                })

                .catch(err => res.status(err.status).json({status: false, message: err.message}));
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //update data petani
    router.put('/petani/:id', (req, res) => {
        if(cekLogin.checkToken(req)){
            const ktp 		            = req.body.ktp;
            const nama 		            = req.body.nama;
            const tempat_lahir 	        = req.body.tempat_lahir;
            const tanggal_lahir	        = req.body.tanggal_lahir;
            const jenis_kelamin	        = req.body.jenis_kelamin;
            const pendidikan            = req.body.pendidikan;
            const status_keluarga	    = req.body.status_keluarga;
            const alamat                = req.body.alamat;
            const no_hp	                = req.body.no_hp;
            const nama_kelompok_petani  = req.body.namakelopoktani;

            if (!req.params.id || !nama || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !pendidikan || !status_keluarga || !alamat || !no_hp || !nama_kelompok_petani
                ||!req.params.id.trim() || !nama.trim() || !tempat_lahir.trim() || !tanggal_lahir.trim() || !jenis_kelamin.trim() || !pendidikan.trim()
                || !status_keluarga.trim() || !alamat.trim() || !no_hp.trim() || !nama_kelompok_petani.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                petaniController.updatePetani(req.params.id,ktp,nama,tempat_lahir,tanggal_lahir,jenis_kelamin,pendidikan,status_keluarga,alamat,no_hp,nama_kelompok_petani)

                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //delete data petani
    router.delete('/petani/:id', (req, res) => {
        if (cekLogin.checkToken(req)){
            if (!req.params.id || !req.params.id.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                petaniController.deletePetani(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.get('/petani/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                petaniController.dataPetaniKtp(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });
}
