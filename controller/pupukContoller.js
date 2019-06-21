'use strict'

const datapupuk = require('../model/pupukModel')

exports.inputPupuk = (kode, nama, jenisPupuk, harga, tipe) =>
    new Promise((resolve,reject) => {
        const dataPupuks = new datapupuk({
            kode          : kode,
            nama_pupuk 	  : nama,
            jenis_pupuk   : jenisPupuk,
            harga         : harga,
            tipe          : tipe,
            created_at    : new Date()
        });

        dataPupuks.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'kode sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });


exports.dataPupuk = ()=>
    new Promise((resolve, reject)=>{
        datapupuk.find()
            .then(kodes => {
                if (kodes.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: kodes});
                }
            })

    });

exports.updatePupuk = (_id, kode, nama, jenisPupuk, harga, tipe) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id : _id
        });

        const dataPupuk = ({
            kode            : kode,
            nama_pupuk 		: nama,
            jenis_pupuk     : jenisPupuk,
            harga           : harga,
            tipe            : tipe,
            updated_at      : new Date()
        });

        datapupuk.update(ids, dataPupuk)
            .then(() => resolve({
                status: 200, message: 'Berhasil update data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.deletePupuk = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        datapupuk.remove(ids)
            .then(() => resolve({
                status: 200, message: 'Berhasil menghapus data'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });
//

exports.dataPupukId = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        datapupuk.findOne(ids)
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
