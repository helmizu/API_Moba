const express = require('express');
const router = express.Router();
const data = require('../controller/data')

router.post('/headcoach', data.uploadImageCoach, data.insertHeadcoach)
router.post('/manager', data.uploadImageAll, data.insertManager)
router.post('/medis', data.uploadImageAll, data.insertMedis)
router.post('/guru', data.uploadImageAll, data.insertGuru)

router.get('/headcoach/:sekolah', data.getHeadcoach)
router.get('/manager/:sekolah', data.getManager)
router.get('/medis/:sekolah', data.getMedis)
router.get('/guru/:sekolah', data.getGuru)

router.put('/headcoach/:id', data.uploadImageCoach, data.updateHeadcoach)
router.put('/manager/:id', data.uploadImageAll, data.updateManager)
router.put('/medis/:id', data.uploadImageAll, data.updateMedis)
router.put('/guru/:id', data.uploadImageAll, data.updateGuru)

router.delete('/headcoach/:id', data.deleteHeadcoach)
router.delete('/manager/:id', data.deleteManager)
router.delete('/medis/:id', data.deleteMedis)
router.delete('/guru/:id', data.deleteGuru)

router.post('/pemain', data.uploadImageAll, data.insertPemain)
router.get('/pemain/:sekolah', data.getPemain)
router.get('/pemain/detail/:id', data.getPemainDetail)
router.put('/pemain/:id', data.uploadImageAll, data.updatePemain)
router.delete('/pemain/:id', data.deletePemain)

router.post('/syarat', data.uploadSyarat, data.insertSyarat)
router.put('/syarat', data.verifikasi)
router.get('/syarat/:sekolah', data.getSyarat)

module.exports = router;