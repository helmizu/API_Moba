const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const database = require('../libraries/database')
const keys = require('../config/keys')
const userCol = "user"
const connect_err = {err : "Connection Error"}

var users = {};

users.getUsers = function (req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        if (err) return res.status(500).json(connect_err)
        const db = client.db(keys.dbName)
        database.findData(db, userCol, {}, function (err, data) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
        client.close()
    })
}

users.getUser = function (req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        if (err) return res.status(500).json(connect_err)
        const db = client.db(keys.dbName)
        database.findData(db, col.pemain, {
            _id: new database.OID(req.params.id)
        }, function (err, data) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data[0])
        })
        client.close()
    })
}

users.registerUser = function (req, res) {
    MongoClient.connect(keys.mongoURI, {useNewUrlParser : true}, function (err, client) {
        if (err) return res.status(500).json(connect_err)
        const db = client.db(keys.dbName)
        var data = req.body
        if(!data.email || (typeof data.email === undefined) || data.email === "") { return res.status(400).json({msg : "email required"}) } else { data.email = data.email.toLowerCase() }
        if(!data.password || (typeof data.password === undefined) || data.password === "") { return res.status(400).json({msg : "password required"}) } 
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(!data.kategori || (typeof data.kategori === undefined) || data.kategori === "") { return res.status(400).json({msg : "kategori required"}) } 
        data.sekolah = `${req.body.sekolah.toLowerCase()} - ${req.body.kategori.toLowerCase()}`
        database.findData(db, userCol, { email : data.email }, function (err, user) {
            if (err) return res.status(500).json(err)
            if (user.length > 0) return res.status(400).json({err : "user telah terdaftar"})
            else {
                database.findData(db, userCol, { sekolah : data.sekolah }, function (err, sekolah) {
                    if (err) return res.status(500).json(err)
                    if (sekolah.length > 0) return res.status(400).json({err : "sekolah dengan tim ini telah terdaftar"})
                    else{
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
    
    users.loginAdmin = function (req, res) {
        var data = req.body
        if ( data.email === "adminmoba@mobacup.com" ) {
            if ( data.password === "jangankepo" ) {
                jwt.sign(
                    data, 
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
                    return res.status(400).json({err : "password salah. benerin dulu"})
                }
            } else {
                return res.status(404).json({err : "Email salah. Kamu admin apa bukan?"})
            }
        }

        module.exports = users