const MongoClient = require('mongodb').MongoClient
const database = require('../libraries/database')
const keys = require('../config/keys')
const col = {
    headcoach : "headcoach",
    manager : "manager",
    medis : "medis",
    guru : "guru",
    pemain : "pemain"
}

// set up upload image
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function ( req, file, cb ) {
        cb(null, path.basename(file.originalname, path.extname(file.originalname))+ '-' + Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

var data = {

    uploadImageAll : upload.fields(
        [
            { name: 'image', maxCount: 1 },
            { name: 'kartu_identitas', maxCount: 1 }
        ]
    ),
    //  req.files['image'][0] -> File
    //  req.files['kartu_identitas'][0] -> File
    
    uploadImageCoach : upload.fields(
        [
            { name: 'image', maxCount: 1 },
            { name: 'kartu_identitas', maxCount: 1 },
            { name: 'kartu_lisensi', maxCount: 1 }
        ]
    ),
    
    insertHeadcoach: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
            if(req.files['image']) {
                data.image = req.files['image'][0].filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            if(req.files['kartu_identitas']) {
                data.kartu_identitas = req.files['kartu_identitas'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if(req.files['kartu_lisensi']) {
                data.kartu_lisensi = req.files['kartu_lisensi'][0].filename
                msg = 'Data Inserted with Kartu Lisensi'
            } else {
                msg = 'Data Inserted without Kartu Lisensi'
            }

            if(req.files['image'] && req.files['kartu_identitas'] && req.files['kartu_lisensi']) {
                msg = 'Data Inserted'
            }

            database.insertData(db, col.headcoach, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({msg : msg})
            })
            client.close()
        })
    },
    
    insertManager: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
            if(req.files['image']) {
                data.image = req.files['image'][0].filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            if(req.files['kartu_identitas']) {
                data.kartu_identitas = req.files['kartu_identitas'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }  
            if(req.files['image'] && req.files['kartu_identitas']) {
                msg = 'Data Inserted'
            }
            database.insertData(db, col.manager, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({msg : msg})
            })
            client.close()
        })
    },
    
    insertMedis: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
            if(req.files['image']) {
                data.image = req.files['image'][0].filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            if(req.files['kartu_identitas']) {
                data.kartu_identitas = req.files['kartu_identitas'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if(req.files['image'] && req.files['kartu_identitas']) {
                msg = 'Data Inserted'
            }
            database.insertData(db, col.medis, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({msg : msg})
            })
            client.close()
        })
    },
    
    insertGuru: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
            if(req.files['image']) {
                data.image = req.files['image'][0].filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            if(req.files['kartu_identitas']) {
                data.kartu_identitas = req.files['kartu_identitas'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if(req.files['image'] && req.files['kartu_identitas']) {
                msg = 'Data Inserted'
            }    
            database.insertData(db, col.guru, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({msg : msg})
            })
            client.close()
        })
    },
    
    getHeadcoach: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.user
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.findData(db, col.headcoach, {sekolah : data.sekolah}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
    
    getManager: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.user
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.findData(db, col.manager, {sekolah : data.sekolah}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
    
    getMedis: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.user
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.findData(db, col.medis, {sekolah : data.sekolah}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
    
    getGuru: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.user
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.findData(db, col.guru, {sekolah : data.sekolah}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
    
    updateHeadcoach: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.updateData(db, col.headcoach, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    updateManager: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.updateData(db, col.manager, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    updateMedis: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.updateData(db, col.medis, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    updateGuru: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.updateData(db, col.guru, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    deleteHeadcoach: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if(!data.id || (typeof data.id === undefined) || data.id === "") { return res.status(400).json({msg : "id required"}) }     
            database.removeData(db, col.headcoach, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    deleteManager: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if(!data.id || (typeof data.id === undefined) || data.id === "") { return res.status(400).json({msg : "id required"}) }     
            database.removeData(db, col.manager, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    deleteMedis: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if(!data.id || (typeof data.id === undefined) || data.id === "") { return res.status(400).json({msg : "id required"}) }     
            database.removeData(db, col.medis, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    deleteGuru: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.params
            if(!data.id || (typeof data.id === undefined) || data.id === "") { return res.status(400).json({msg : "id required"}) }     
            database.removeData(db, col.guru, data.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    }
    ,
    
    insertPemain: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            var msg = ''
            data.sekolah = req.user.sekolah         
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
            if(req.files['image']) {
                data.image = req.files['image'][0].filename
                msg = 'Data Inserted with Image'
            } else {
                msg = 'Data Inserted without Image'
            }
            if(req.files['kartu_identitas']) {
                data.kartu_identitas = req.files['kartu_identitas'][0].filename
                msg = 'Data Inserted with Kartu Identitas'
            } else {
                msg = 'Data Inserted without Kartu Identitas'
            }
            if(req.files['image'] && req.files['kartu_identitas']) {
                msg = 'Data Inserted'
            }    
            database.insertData(db, col.pemain, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(201).json({msg : msg})
            })
            client.close()
        })
    },
    
    getPemain: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.user
            if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) }     
            database.findData(db, col.pemain, {sekolah : data.sekolah}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data)
            })
            client.close()
        })
    },
    
    getPemainDetail: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            database.findData(db, col.pemain, {_id : new database.OID(req.params.id)}, function (err, data) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(data[0])
            })
            client.close()
        })
    },
    
    updatePemain: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            const data = req.body
            database.updateData(db, col.pemain, req.params.id, data, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
    
    deletePemain: function(req, res) {
        MongoClient.connect(keys.mongoURI, function (err, client) {
            const db = client.db(keys.dbName)
            if(!req.params.id || (typeof req.params.id === undefined) || req.params.id === "") { return res.status(400).json({msg : "id required"}) }     
            database.removeData(db, col.pemain, req.params.id, function (err, result) {
                if (err) return res.status(500).json(err)
                return res.status(200).json(result)
            })
            client.close()
        })
    },
}

module.exports = data