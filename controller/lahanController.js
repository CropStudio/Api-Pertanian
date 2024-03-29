'use strict'

const datalahan = require('../model/lahanModel')
const ktpCoi    = require('../model/petaniModel')

exports.inputLahan = (ktp, alamat, kepemilikan, jenis, luas, peruntukan) =>
    new Promise((resolve,reject) => {

        const dataLahan = new datalahan({
            ktp                 : ktp,
            alamat_lahan 		: alamat,
            kepemilikan 	    : kepemilikan,
            jenis_lahan	        : jenis,
            luas_lahan	        : luas,
            peruntukan          : peruntukan,
            created_at          : new Date()
        });

        dataLahan.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'ktp sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });


exports.dataLahan = ()=>
    new Promise((resolve, reject)=>{
        datalahan.find()
            .then(ktps => {
                if (ktps.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: ktps});
                }
            })

    });


exports.updateLahan = (id,ktp, alamat, kepemilikan, jenis, luas, peruntukan) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id : id
        });

        const dataLahan = ({
            ktp                 : ktp,
            alamat_lahan 		: alamat,
            kepemilikan 	    : kepemilikan,
            jenis_lahan	        : jenis,
            luas_lahan	        : luas,
            peruntukan          : peruntukan,
            updated_at          : new Date()
        });

        datalahan.update(ids, dataLahan)
            .then(() => resolve({
                status: 200, message: 'Berhasil update data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.deleteLahan = (id) =>
    new Promise((resolve,reject) => {

        const ktps = ({
            _id:id
        });

        datalahan.remove(ktps)
            .then(() => resolve({
                status: 200, message: 'Berhasil menghapus data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.dataLahanId = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        datalahan.findOne(ids)
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

exports.dataKtp = ()=>
    new Promise((resolve, reject)=>{
        ktpCoi.find({}, 'ktp')
            .then(ktps => {
                if (ktps.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    console.log(ktps);
                    resolve({ status: 200, message: ktps});
                }
            })

    });
