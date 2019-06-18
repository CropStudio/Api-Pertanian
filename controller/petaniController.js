'use strict'

const datapetani = require('../model/petaniModel')


exports.inputBiodata = (ktp, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, pendidikan, status_keluarga, alamat, no_hp, namakelopoktani) =>
    new Promise((resolve,reject) => {

        const dataPetani = new datapetani({
            ktp                     : ktp,
            nama 		            : nama,
            tempat_lahir 	        : tempat_lahir,
            tanggal_lahir	        : tanggal_lahir,
            jenis_kelamin	        : jenis_kelamin,
            pendidikan              : pendidikan,
            status_keluarga	        : status_keluarga,
            alamat                  : alamat,
            no_hp	                : no_hp,
            nama_kelompok_petani    : namakelopoktani,
            created_at              : new Date()
        });

        dataPetani.save()

            .then(() => resolve({ status: 200, message: 'Berhasil input data' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'ktp sudah digunakan' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });


exports.dataPetani = ()=>
    new Promise((resolve, reject)=>{
        datapetani.find()
            .then(ktps => {
                if (ktps.length == 0) {
                    reject({status: 200, message: 'tidak ada data' });
                } else {
                    resolve({ status: 200, message: ktps});
                }
            })

    });


exports.updatePetani = (id,ktp, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, pendidikan, status_keluarga, alamat, no_hp, namakelopoktani) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id : id
        });

        const dataPetani = ({
            ktp:ktp,
            nama 		            : nama,
            tempat_lahir 	        : tempat_lahir,
            tanggal_lahir	        : tanggal_lahir,
            jenis_kelamin	        : jenis_kelamin,
            pendidikan              : pendidikan,
            status_keluarga	        : status_keluarga,
            alamat                  : alamat,
            no_hp	                : no_hp,
            nama_kelompok_petani    : namakelopoktani,
            updated_at              : new Date()
        });

        datapetani.update(ids, dataPetani)
            .then(() => resolve({
                status: 200, message: 'Berhasil update data petani'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.deletePetani = (ktp) =>
    new Promise((resolve,reject) => {

        const ktps = ({
            _id:ktp
        });

        datapetani.remove(ktps)
            .then(() => resolve({
                status: 200, message: 'Berhasil menghapus data petani'
            }))
            .catch(err => {
                reject({ status: 200, message: 'Gagal' });
            });
    });

exports.dataPetaniKtp = (id) =>
    new Promise((resolve,reject) => {

        const ids = ({
            _id:id
        });

        datapetani.findOne(ids)
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
