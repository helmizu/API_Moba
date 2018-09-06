const MongoClient = require('mongodb').MongoClient
const database = require('../libraries/database')
const keys = require('../config/keys')
const col = {
    alumni: "alumni"
}

var dbo = null;

// set up upload image
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/assets/',
    filename: function (req, file, cb) {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

var admin = {
    uploadFoto: upload.single('admin'),

    insertAlumni: (req, res) => {
        MongoClient.connect(keys.mongoURI, (err, client) => {
            if (err) return res.status(500).json(err)
            const db = client.db(keys.dbName)
            var data = req.body
            var msg = ''
            if (req.file) {
                data.image = req.file.filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            database.insertData(db, col.alumni, data, (err, result) => {
                client.close()
                if (err) return res.status(500).json(err)
                res.status(201).json({
                    msg: msg
                })
            })
        })
    },

    getAlumni: (req, res) => {
        MongoClient.connect(keys.mongoURI, (err, client) => {
            if (err) return res.status(500).json(err)
            const db = client.db(keys.dbName)
            database.findData(db, col.alumni, {}, (err, result) => {
                client.close()
                if (err) return res.status(500).json(err)
                res.status(200).json(result)
            })
        })
    },

    updateAlumni: (req, res) => {
        MongoClient.connect(keys.mongoURI, (err, client) => {
            if (err) return res.status(500).json(err)
            const db = client.db(keys.dbName)
            var data = req.body
            if (req.file) {
                data.image = req.file.filename
            }
            database.updateData(db, col.alumni, req.params.id, data, (err, result) => {
                client.close()
                if (err) return res.status(500).json(err)
                res.status(201).json(result)
            })
        })
    },

    deleteAlumni: (req, res) => {
        MongoClient.connect(keys.mongoURI, (err, client) => {
            if (err) return res.status(500).json(err)
            const db = client.db(keys.dbName)
            database.removeData(db, col.alumni, req.params.id, (err, result) => {
                client.close()
                if (err) return res.status(500).json(err)
                res.status(500).json(result)
            })
        })
    }
}

module.exports = admin