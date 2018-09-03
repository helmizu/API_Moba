const express = require('express');
const router = express.Router();
const data = require('../controller/data')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/headcoach', data.uploadImage, data.insertHeadcoach)
router.post('/manager', data.uploadImage, data.insertManager)
router.post('/medis', data.uploadImage, data.insertMedis)
router.post('/guru', data.uploadImage, data.insertGuru)

router.get('/headcoach/:sekolah', data.getHeadcoach)
router.get('/manager/:sekolah', data.getManager)
router.get('/medis/:sekolah', data.getMedis)
router.get('/guru/:sekolah', data.getGuru)

router.put('/headcoach/:id', data.updateHeadcoach)
router.put('/manager/:id', data.updateManager)
router.put('/medis/:id', data.updateMedis)
router.put('/guru/:id', data.updateGuru)

router.delete('/headcoach/:id', data.deleteHeadcoach)
router.delete('/manager/:id', data.deleteManager)
router.delete('/medis/:id', data.deleteMedis)
router.delete('/guru/:id', data.deleteGuru)

router.post('/pemain', data.uploadImage, data.insertPemain)
router.get('/pemain/:sekolah', data.getPemain)
router.put('/pemain/:id', data.updatePemain)
router.delete('/pemain/:id', data.deletePemain)

module.exports = router;
