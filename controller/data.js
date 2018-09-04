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

const uploadImage = upload.single('image');

function insertHeadcoach(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        data.sekolah = req.user.sekolah         
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(req.file) {
            data.image = req.file.filename
            msg = 'Data Inserted with Image'
        } else {
            msg = 'Data Inserted without Image'
        }    
        database.insertData(db, col.headcoach, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(201).json({msg : msg})
        })
        client.close()
    })
}

function insertManager(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        data.sekolah = req.user.sekolah         
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(req.file) {
            data.image = req.file.filename
            msg = 'Data Inserted with Image'
        } else {
            msg = 'Data Inserted without Image'
        }    
        database.insertData(db, col.manager, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(201).json({msg : msg})
        })
        client.close()
    })
}

function insertMedis(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        data.sekolah = req.user.sekolah         
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(req.file) {
            data.image = req.file.filename
            msg = 'Data Inserted with Image'
        } else {
            msg = 'Data Inserted without Image'
        }    
        database.insertData(db, col.medis, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(201).json({msg : msg})
        })
        client.close()
    })
}

function insertGuru(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        data.sekolah = req.user.sekolah         
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(req.file) {
            data.image = req.file.filename
            msg = 'Data Inserted with Image'
        } else {
            msg = 'Data Inserted without Image'
        }    
        database.insertData(db, col.guru, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(201).json({msg : msg})
        })
        client.close()
    })
}

function getHeadcoach(req, res) {
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
}

function getManager(req, res) {
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
}

function getMedis(req, res) {
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
}

function getGuru(req, res) {
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
}

function updateHeadcoach(req, res) {
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
}

function updateManager(req, res) {
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
}

function updateMedis(req, res) {
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
}

function updateGuru(req, res) {
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
}

function deleteHeadcoach(req, res) {
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
}

function deleteManager(req, res) {
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
}

function deleteMedis(req, res) {
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
}

function deleteGuru(req, res) {
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


function insertPemain(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        data.sekolah = req.user.sekolah         
        if(!data.sekolah || (typeof data.sekolah === undefined) || data.sekolah === "") { return res.status(400).json({msg : "sekolah required"}) } 
        if(req.file) {
            data.image = req.file.filename
            msg = 'Data Inserted with Image'
        } else {
            msg = 'Data Inserted without Image'
        }    
        database.insertData(db, col.pemain, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(201).json({msg : msg})
        })
        client.close()
    })
}

function getPemain(req, res) {
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
}

function getPemainDetail(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        database.findData(db, col.pemain, {_id : new database.OID(req.params.id)}, function (err, data) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data[0])
        })
        client.close()
    })
}

function updatePemain(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        const data = req.body
        database.updateData(db, col.pemain, req.params.id, data, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(result)
        })
        client.close()
    })
}

function deletePemain(req, res) {
    MongoClient.connect(keys.mongoURI, function (err, client) {
        const db = client.db(keys.dbName)
        if(!req.params.id || (typeof req.params.id === undefined) || req.params.id === "") { return res.status(400).json({msg : "id required"}) }     
        database.removeData(db, col.pemain, req.params.id, function (err, result) {
            if (err) return res.status(500).json(err)
            return res.status(200).json(result)
        })
        client.close()
    })
}
module.exports = { 
    uploadImage, 
    insertHeadcoach, 
    insertGuru, 
    insertManager, 
    insertMedis, 
    getHeadcoach,
    getManager,
    getMedis,
    getGuru,
    updateHeadcoach,
    updateManager,
    updateMedis,
    updateGuru,
    deleteHeadcoach,
    deleteManager,
    deleteMedis,
    deleteGuru,
    insertPemain,
    getPemain,
    getPemainDetail,
    updatePemain,
    deletePemain,
}