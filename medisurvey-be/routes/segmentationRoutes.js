const express = require('express');
const router = express.Router();
const segmentationController = require('../controllers/segmentationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Tüm route'lar için authentication gerekli
router.use(authMiddleware);

// Yeni segmentasyon oluştur
router.post('/', segmentationController.createSegmentation);

// Belirli bir segmentasyonu getir
router.get('/:id', segmentationController.getSegmentation);

// Hasta için tüm segmentasyonları getir
router.get('/patient/:patientId', segmentationController.getPatientSegmentations);

// Segmentasyonu sil
router.delete('/:id', segmentationController.deleteSegmentation);

module.exports = router; 