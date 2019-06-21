'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const user = require('../controller/userController');
const config = require('../config/config');
const userModel = require('../model/userModel');
const cekLogin      = require('../controller/cekUsersLogin')

module.exports = router => {

    //login user
    router.post('/login', (req, res) => {
        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({success : false,message: 'Invalid Request !'});

        } else {
            //
            user.loginUser(credentials.name, credentials.pass)
                .then(result => {
                    const token = jwt.sign(result, config.secret, {expiresIn: 1440});
                    userModel.update(
                        {ktp        : result.message.ktp}, // Filter
                        {api_token  : token}, // Update
                        {upsert     : true}); // add document with req.body._id if not exists
                    console.log(result.message.ktp);
                    res.status(result.status).json({success : true,message: result.message, token : token});
                })
                .catch(err => res.status(err.status).json({success: false, message: err.message}));
        }
    });


    //register user
    router.post('/registrasi', (req, res) => {

        var ktp             = req.body.ktp
        var firstname       = req.body.firstname
        var lastname 	    = req.body.lastname
        var username 	    = req.body.username
        var email	        = req.body.email
        var notelp	        = req.body.notelp
        var tgllahir        = req.body.tgllahir
        var alamat	        = req.body.alamat
        var level           = req.body.level
        var password	    = req.body.password

        if (!ktp || !firstname || !lastname || !email || !notelp || !tgllahir || !alamat || !level || !password || !ktp || !firstname.trim() || !lastname.trim()
            || !username.trim() || !email.trim() || !notelp.trim() || !tgllahir.trim() || !alamat.trim() || !level.trim() || !password.trim()) {
            res.status(400).json({message: 'Gagal'});
        } else {

            user.registerUser(ktp, firstname, lastname, username, email, notelp, tgllahir, alamat, level, password)
                .then(result => {
                    res.status(result.status).json({success : true,message: result.message})
                })
                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });



}
