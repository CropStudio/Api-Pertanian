'use strict';

const petaniController = require('../controller/petaniController')


module.exports = router => {

    //input data petani
    router.post('/petani', (req, res) => {
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
    });

    //get data petani
    router.get('/petani', (req, res) => {

        petaniController.dataPetani()
            .then(result => {
                console.log(result)
                res.status(result.status).json({status:true,message: result.message})
            })

            .catch(err => res.status(err.status).json({status:false,message: err.message}));
    });

    //update data petani
    router.put('/petani/:id', (req, res) => {

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
    });

    //delete data petani
    router.delete('/petani/:id', (req, res) => {

        if (!req.params.id || !req.params.id.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            petaniController.deletePetani(req.params.id)

                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })

                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.get('/petani/:id', (req, res) => {

        if (!req.params.id || !req.params.id.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            petaniController.dataPetaniKtp(req.params.id)

                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })

                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }
    });
}
