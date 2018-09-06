const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');

router.get('/alumni', admin.getAlumni)
router.post('/alumni', admin.uploadFoto, admin.insertAlumni)
router.put('/alumni/:id', admin.uploadFoto, admin.updateAlumni)
router.delete('/alumni/:id', admin.deleteAlumni)

module.exports = router