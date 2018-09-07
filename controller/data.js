const MongoClient = require('mongodb').MongoClient
const database = require('../libraries/database')
const keys = require('../config/keys')
const col = {
    headcoach: "headcoach",
    manager: "manager",
    medis: "medis",
    guru: "guru",
    pemain: "pemain",
    syarat : "syarat"
}

// set up upload image
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

var data = {

    uploadSyarat: upload.fields(
        [{
                name: 'rekomendasi',
                maxCount: 1
            },
            {
                name: 'bukti_transfer',
                maxCount: 1
            }
        ]
    ),

    uploadImageAll: upload.fields(
        [{
                name: 'foto',
                maxCount: 1
            },
            {
                name: 'ktp',
                maxCount: 1
            }
        ]
    ),
    //  req.files['foto'][0] -> File
    //  req.files['ktp'][0] -> File

    uploadImageCoach: upload.fields(
        [{
                name: 'foto',
                maxCount: 1
            },
            {
                name: 'ktp',
                maxCount: 1
            },
            {
                name: 'lisensi',
                maxCount: 1
            }
        ]
    ),

    insertHeadcoach: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
                msg = 'Data Inserted with foto'
            } else {
                msg = 'Data Inserted without foto'
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if (req.files['lisensi']) {
                data.lisensi = req.files['lisensi'][0].filename
                msg = 'Data Inserted with Kartu Lisensi'
            } else {
                msg = 'Data Inserted without Kartu Lisensi'
            }

            if (req.files['foto'] && req.files['ktp'] && req.files['lisensi']) {
                msg = 'Data Inserted'
            }
            database.findData(db, col.headcoach, {sekolah : data.sekolah}, function (err, docs) {
                if (err) return res.status(500).json(err)
                if (docs.length > 0) {
                    return res.status(400).json({err : "Anda telah menambahkan data pelatih"})
                } else {
                    database.insertData(db, col.headcoach, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(201).json({
                            msg: msg
                        })
                    })
                }
            })
        })
    },

    insertManager: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
                msg = 'Data Inserted with foto'
            } else {
                msg = 'Data Inserted without foto'
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if (req.files['foto'] && req.files['ktp']) {
                msg = 'Data Inserted'
            }
            database.findData(db, col.manager, {sekolah : data.sekolah}, function (err, docs) {
                if (err) return res.status(500).json(err)
                if (docs.length > 0) {
                    return res.status(400).json({err : "Anda telah menambahkan data manajer"})
                } else {
                    database.insertData(db, col.manager, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(201).json({
                            msg: msg
                        })
                    })
                }
            })
        })
    },

    insertMedis: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
                msg = 'Data Inserted with foto'
            } else {
                msg = 'Data Inserted without foto'
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if (req.files['foto'] && req.files['ktp']) {
                msg = 'Data Inserted'
            }
            database.findData(db, col.medis, {sekolah : data.sekolah}, function (err, docs) {
                if (err) return res.status(500).json(err)
                if (docs.length > 0) {
                    return res.status(400).json({err : "Anda telah menambahkan data medis"})
                } else {
                    database.insertData(db, col.medis, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(201).json({
                            msg: msg
                        })
                    })
                }
            })
        })
    },

    insertGuru: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
                msg = 'Data Inserted with foto'
            } else {
                msg = 'Data Inserted without foto'
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if (req.files['foto'] && req.files['ktp']) {
                msg = 'Data Inserted'
            }
            database.findData(db, col.guru, {sekolah : data.sekolah}, function (err, docs) {
                if (err) return res.status(500).json(err)
                if (docs.length > 0) {
                    return res.status(400).json({err : "Anda telah menambahkan data guru"})
                } else {
                    database.insertData(db, col.guru, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(201).json({
                            msg: msg
                        })
                    })
                }
            })
        })
    },

    getHeadcoach: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.findData(db, col.headcoach, {
                sekolah: data.sekolah
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },

    getManager: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.findData(db, col.manager, {
                sekolah: data.sekolah
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },

    getMedis: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.findData(db, col.medis, {
                sekolah: data.sekolah
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },

    getGuru: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.findData(db, col.guru, {
                sekolah: data.sekolah
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },

    updateHeadcoach: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
            }
            if (req.files['lisensi']) {
                data.lisensi = req.files['lisensi'][0].filename
            }
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.updateData(db, col.headcoach, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    updateManager: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
            }
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.updateData(db, col.manager, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    updateMedis: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
            }
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.updateData(db, col.medis, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    updateGuru: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
            }
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.updateData(db, col.guru, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    deleteHeadcoach: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.id || (typeof data.id === undefined) || data.id === "") {
                return res.status(400).json({
                    msg: "id required"
                })
            }
            database.removeData(db, col.headcoach, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    deleteManager: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.id || (typeof data.id === undefined) || data.id === "") {
                return res.status(400).json({
                    msg: "id required"
                })
            }
            database.removeData(db, col.manager, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    deleteMedis: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.id || (typeof data.id === undefined) || data.id === "") {
                return res.status(400).json({
                    msg: "id required"
                })
            }
            database.removeData(db, col.medis, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    deleteGuru: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.id || (typeof data.id === undefined) || data.id === "") {
                return res.status(400).json({
                    msg: "id required"
                })
            }
            database.removeData(db, col.guru, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    insertPemain: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
                msg = 'Data Inserted with foto'
            } else {
                msg = 'Data Inserted without foto'
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if (req.files['foto'] && req.files['ktp']) {
                msg = 'Data Inserted'
            }
            database.insertData(db, col.pemain, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({
                    msg: msg
                })
            })
            client.close()
        })
    },

    getPemain: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            database.findData(db, col.pemain, {
                sekolah: data.sekolah
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data)
            })
            client.close()
        })
    },

    getPemainDetail: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            database.findData(db, col.pemain, {
                _id: new database.OID(req.params.id)
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },

    updatePemain: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            if (req.files['foto']) {
                data.foto = req.files['foto'][0].filename
            }
            if (req.files['ktp']) {
                data.ktp = req.files['ktp'][0].filename
            }
            database.updateData(db, col.pemain, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    deletePemain: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            if (!req.params.id || (typeof req.params.id === undefined) || req.params.id === "") {
                return res.status(400).json({
                    msg: "id required"
                })
            }
            database.removeData(db, col.pemain, req.params.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },

    insertSyarat: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            if (!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") {
                return res.status(400).json({
                    msg: "sekolah required"
                })
            }
            if (req.files['rekomendasi']) {
                data.rekomendasi = req.files['rekomendasi'][0].filename
                msg = 'Data Inserted with rekomendasi'
            } else {
                msg = 'Data Inserted without rekomendasi'
            }
            if (req.files['bukti_transfer']) {
                data.bukti_transfer = req.files['bukti_transfer'][0].filename
                msg = 'Data Inserted with Bukti Transfer'
            } else {
                msg = 'Data Inserted without Bukti Transfer'
            }
            if (req.files['rekomendasi'] && req.files['bukti_transfer']) {
                msg = 'Data Inserted'
            }
            database.findData(db, col.syarat, {sekolah : data.sekolah}, function (err, docs) {
                if (err) return res.status(500).json(err)
                if (docs.length > 0) {
                    database.updateData(db, col.syarat, docs[0]._id, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(200).json({
                            msg: msg
                        })
                    })
                } else {
                    database.insertData(db, col.syarat, data, function (err, result) {
                        client.close()
                        if (err) return res.status(500).json(err)
                        return res.status(201).json({
                            msg: msg
                        })
                    })
                }
            })

        })
    },

    getSyarat: function (req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            database.findData(db, col.syarat, {
                sekolah: req.params.sekolah 
            }, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
}

module.exports = data