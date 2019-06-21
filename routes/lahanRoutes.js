'use strict';

const lahanController = require('../controller/lahanController')
const cekLogin      = require('../controller/cekUsersLogin')

module.exports = router => {

    //input data petani
    router.post('/lahan', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const ktp               = req.body.ktp;
            const alamat_lahan 		= req.body.alamat_lahan;
            const kepemilikan 	    = req.body.kepemilikan;
            const jenis_lahan	    = req.body.jenis_lahan
            const luas_lahan	    = req.body.luas_lahan
            const peruntukan        = req.body.peruntukan

            if (!ktp || !alamat_lahan || !kepemilikan || !jenis_lahan || !luas_lahan || !peruntukan
                ||!ktp.trim() || !alamat_lahan.trim() || !kepemilikan.trim() || !jenis_lahan.trim() || !luas_lahan.trim() || !peruntukan.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {
                lahanController.inputLahan(ktp,alamat_lahan, kepemilikan, jenis_lahan, luas_lahan, peruntukan)
                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })
                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else {
            res.status(200).json({ message: 'Login please' });
        }
    });

    //get data pupuk
    router.get('/lahan', (req, res) => {
        if(cekLogin.checkToken(req)) {
            lahanController.dataLahan()
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
    router.put('/lahan/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const ktp               = req.body.ktp;
            const alamat_lahan 		= req.body.alamat_lahan;
            const kepemilikan 	    = req.body.kepemilikan;
            const jenis_lahan	    = req.body.jenis_lahan
            const luas_lahan	    = req.body.luas_lahan
            const peruntukan        = req.body.peruntukan

            if (!req.params.id || !ktp ||  !alamat_lahan || !kepemilikan || !jenis_lahan || !luas_lahan || !luas_lahan || !peruntukan
                ||!req.params.id.trim() || !ktp.trim() || !alamat_lahan.trim() || !kepemilikan.trim() || !jenis_lahan.trim() || !luas_lahan.trim() || !peruntukan.trim()) {
                res.status(400).json({message: 'Gagal'});
            } else {
                lahanController.updateLahan(req.params.id,ktp,alamat_lahan,kepemilikan,jenis_lahan,luas_lahan, peruntukan)
                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })
                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });

    //
    //delete data petani
    router.delete('/lahan/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim() ) {

                res.status(400).json({message: 'Gagal'});

            } else {

                lahanController.deleteLahan(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.get('/lahan/:id', (req, res) => {
        if(cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim() ) {

                res.status(400).json({message: 'Gagal'});

            } else {

                lahanController.dataLahanId(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });

    //get data pupuk
    router.get('/getktp', (req, res) => {
        if(cekLogin.checkToken(req)) {
            lahanController.dataKtp()
                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })
                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });
};
