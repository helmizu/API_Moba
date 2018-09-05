const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const database = require('../libraries/database')
const keys = require('../config/keys')
const userCol = "user"
const connect_err = {err : "Connection Error"}

var users = {};

users.registerUser = function (req, res) {
    MongoClient.connect(keys.mongoURI, {useNewUrlParser : true}, function (err, client) {
        if (err) return res.status(500).json(connect_err)
        const db = client.db(keys.dbName)
        var data = req.body
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(!data.kategori || (typeof data.kategori === undefined) || data.kategori === "") { return res.status(400).json({msg : "kategori required"}) } 
        data.sekolah = `${req.body.sekolah} ${req.body.kategori}`
        database.findData(db, userCol, { email : data.email }, function (err, user) {
            if (err) return res.status(500).json(err)
            if (user.length > 0) return res.status(400).json({err : "user telah terdaftar"})
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) return res.status(500).json({err : "hash error"})
                    bcrypt.hash(data.password, salt, (err, hash) => {
                        if(err) return res.status(500).json({err : "hash error"})
                        data.password = hash
                        database.insertData(db, userCol, data, function (err, result) {
                            client.close()
                            if (err) return res.status(500).json(err)
                            res.status(201).json({msg : "Selamat anda berhasil mendaftar"})
                        })
                    })
                })
            }
        })
    })
}

users.loginUser = function (req, res) {
    MongoClient.connect(keys.mongoURI, {useNewUrlParser : true}, function (err, client) {
        if (err) return res.status(500).json(connect_err)
        const db = client.db(keys.dbName)
        var data = req.body
        database.findData(db, userCol, {email : data.email}, function (err, user) {
            if (err) return res.status(500).json(err)
            if (user.length > 0) {
                bcrypt.compare(data.password, user[0].password, function (err, isMatch) {
                    if (err) return res.status(500).json({err : "compare error"})
                    if (isMatch) {
                        jwt.sign(
                            user[0], 
                            keys.secretOrKey, 
                            {expiresIn: 60*60}, 
                            (err, token) => {
                                if (err) return res.status(500).json({err : "generate token error"})
                                return res.status(200).json({
                                    success : true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                    } else {
                        return res.status(400).json({err : "password salah"})
                    }
                })
            } else {
                return res.status(404).json({err : "User belum terdaftar"})
            }
        })
    })
}

module.exports = users