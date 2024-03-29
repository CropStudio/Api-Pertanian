'use strict';

const supController = require('../controller/supController')
const cekLogin      = require('../controller/cekUsersLogin')

module.exports = router => {
    //input data petani
    router.post('/supplier', (req, res) => {
        if(cekLogin.checkToken(req)) {
            const kodesup = req.body.kodesup
            const namasup = req.body.namasup
            const penanggung_jawab = req.body.penanggungjawab
            const alamat = req.body.alamat
            const notelp = req.body.notelp

            if (!kodesup || !namasup || !penanggung_jawab || !alamat || !notelp
                || !kodesup.trim() || !namasup.trim() || !penanggung_jawab.trim() || !alamat.trim() || !notelp.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                supController.inputSupplier(kodesup, namasup, penanggung_jawab, alamat, notelp)
                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })
                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });

    //get data pupuk
    router.get('/supplier', (req, res) => {
        if (cekLogin.checkToken(req)) {
            supController.dataSupplier()
                .then(result => {
                    console.log(result)
                    res.status(result.status).json({status: true, message: result.message})
                })

                .catch(err => res.status(err.status).json({status: false, message: err.message}));
        }else{
            res.status(200).json({ message: 'Login Please' });
        }
    });

    // //update data petani
    router.put('/supplier/:id', (req, res) => {
        if (cekLogin.checkToken(req)) {
            const kodesup             = req.body.kodesup
            const namasup             = req.body.namasup
            const penanggung_jawab    = req.body.penanggungjawab
            const alamat              = req.body.alamat
            const notelp              = req.body.notelp
            if (!req.params.id || !kodesup ||  !namasup || !penanggung_jawab || !alamat || !notelp
                ||!req.params.id.trim() || !kodesup.trim() || !namasup.trim() || !penanggung_jawab.trim() || !alamat.trim() || !notelp.trim()) {
                res.status(400).json({message: 'Gagal'});
            } else {
                supController.updateSupplier(req.params.id,kodesup,namasup,penanggung_jawab,alamat,notelp)
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
    router.delete('/supplier/:id', (req, res) => {
        if (cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim()) {

                res.status(400).json({message: 'Gagal'});

            } else {

                supController.deleteSupplier(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status: true, message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status: false, message: err.message}));
            }
        }else{
            res.status(200).json({ message: 'Login please' });
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.get('/supplier/:id', (req, res) => {
        if (cekLogin.checkToken(req)) {
            if (!req.params.id || !req.params.id.trim() ) {

                res.status(400).json({message: 'Gagal'});

            } else {

                supController.dataSupplierId(req.params.id)

                    .then(result => {
                        res.status(result.status).json({status:true,message: result.message})
                    })

                    .catch(err => res.status(err.status).json({status:false,message: err.message}));
            }
        }
        else {
            res.status(200).json({ message: 'Login please' });
        }
    });
};
