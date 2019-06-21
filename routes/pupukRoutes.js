'use strict';

const pupukController = require('../controller/pupukContoller')

const cekLogin      = require('../controller/cekUsersLogin')

module.exports = router => {

    //input data petani
    router.post('/pupuk', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const kode = req.body.kode;
            const nama = req.body.nama_pupuk;
            const jenis_pupuk = req.body.jenis_pupuk;
            const harga = req.body.harga;
            const tipe = req.body.tipe;

            if (!kode || !nama || !jenis_pupuk || !harga || !tipe
                || !kode.trim() || !nama.trim() || !jenis_pupuk.trim() || !harga.trim() || !tipe.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                pupukController.inputPupuk(kode, nama, jenis_pupuk, harga, tipe)
                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })
                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //get data pupuk
    router.get('/pupuk', (req, res) => {
        if(cekLogin.checkToken(req)) {
            pupukController.dataPupuk()
                .then(result => {
                    console.log(result)
                    res.status(result.status).json({status: true, message: result.message})
                })

                .catch(err => res.status(err.status).json({status: false, message: err.message}));
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    // //update data petani
    router.put('/pupuk/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const kode = req.body.kode;
            const nama = req.body.nama_pupuk;
            const jenis = req.body.jenis_pupuk;
            const harga = req.body.harga;
            const tipe = req.body.tipe;

            if (!req.params.id || !kode || !nama || !jenis || !harga || !tipe
                || !req.params.id.trim() || !kode.trim() || !nama.trim() || !jenis.trim() || !harga.trim() || !tipe.trim()) {
                res.status(400).json({message: 'Gagal'});
            } else {
                pupukController.updatePupuk(req.params.id, kode, nama, jenis, harga, tipe)
                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //
    //delete data petani
    router.delete('/pupuk/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                pupukController.deletePupuk(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else {
        res.status(200).json({ message: 'Login please' });
    }
    });
    //
    //menampilkan data petani berdasarkan ktp
    router.get('/pupuk/:id', (req, res) => {
        if(cekLogin.checkToken(req)){
        if (!req.params.id || !req.params.id.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            pupukController.dataPupukId(req.params.id)

                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })

                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });
}
