'use strict'

const dataSupplier = require('../model/modelSuplier')

exports.inputSupplier = (kodesup, namasup, penanggungjawab, alamat, notelp) =>
    new Promise((resolve,reject) => {
        const dataSuppliers = new dataSupplier({
            kodesup             : kodesup,
            namasup             : namasup,
            penanggung_jawab    : penanggungjawab,
            alamat              : alamat,
            notelp              : notelp,
            created_at          : new Date()
        });

        dataSuppliers.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'kode sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });


exports.dataSupplier = ()=>
    new Promise((resolve, reject)=>{
        dataSupplier.find()
            .then(kodes => {
                if (kodes.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: kodes});
                }
            })

    });

exports.updateSupplier = (_id, kodesup, namasup, penanggungjawab, alamat, notelp) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id : _id
        });

        const dataSup = ({
            kodesup             : kodesup,
            namasup             : namasup,
            penanggung_jawab    : penanggungjawab,
            alamat              : alamat,
            notelp              : notelp,
            updated_at          : new Date()
        });

        dataSupplier.update(ids, dataSup)
            .then(() => resolve({
                status: 200, message: 'Berhasil update data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.deleteSupplier = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        dataSupplier.remove(ids)
            .then(() => resolve({
                status: 200, message: 'Berhasil menghapus data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });
//

exports.dataSupplierId = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        dataSupplier.findOne(ids)
            .then(ressults => {
                if (ressults.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: ressults});
                }
            }).catch(err =>{
            reject({ status: 200, message: 'Data tidak ditemukan' });
        })
    });
