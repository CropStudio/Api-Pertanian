'use strict';

const lahanController = require('../controller/lahanController')


module.exports = router => {

    //input data petani
    router.post('/lahan', (req, res) => {
            const ktp               = req.body.ktp;
            const alamat_lahan 		= req.body.alamat;
            const kepemilikan 	    = req.body.kepemilikan;
            const jenis_lahan	    = req.body.jenislahan
            const luas_lahan	    = req.body.luaslahan
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
    });

    //get data pupuk
    router.get('/lahan', (req, res) => {

        lahanController.dataLahan()
            .then(result => {
                console.log(result)
                res.status(result.status).json({status:true,message: result.message})
            })
            .catch(err => res.status(err.status).json({status:false,message: err.message}));
    });

    // //update data petani
    router.put('/lahan/:id', (req, res) => {
        const ktp               = req.body.ktp;
        const alamat_lahan 		= req.body.alamat;
        const kepemilikan 	    = req.body.kepemilikan;
        const jenis_lahan	    = req.body.jenislahan
        const luas_lahan	    = req.body.luaslahan
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
    });

    //
    //delete data petani
    router.delete('/lahan/:id', (req, res) => {

        if (!req.params.id || !req.params.id.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            lahanController.deleteLahan(req.params.id)

                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })

                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }
    });
    //
    //menampilkan data petani berdasarkan ktp
    router.get('/lahan/:id', (req, res) => {

        if (!req.params.id || !req.params.id.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            lahanController.dataLahanId(req.params.id)

                .then(result => {
                    res.status(result.status).json({status:true,message: result.message})
                })

                .catch(err => res.status(err.status).json({status:false,message: err.message}));
        }
    });

    //get data pupuk
    router.get('/getktp', (req, res) => {
        lahanController.dataKtp()
            .then(result => {
                res.status(result.status).json({status:true,message: result.message})
            })
            .catch(err => res.status(err.status).json({status:false,message: err.message}));
    });
}
