const express = require('express');
const router = express.Router();
const { 
  getAllDoctors, 
  updateDoctor, 
  deleteDoctor, 
  getDoctorInfo, 
  getAllDoctorsByTenant, 
  updateDoctorByTenant, 
  deleteDoctorByTenant,
  getDoctorInfoByTenant
} = require('../controllers/doctorController');

// Doktor ve Admin Doktor route'ları
router.get('/all', getAllDoctors);
router.get('/:doctorId', getDoctorInfo);
router.put('/:doctorId', updateDoctor);
router.delete('/:doctorId', deleteDoctor);

// Tenant route'ları
router.get('/tenant/all', getAllDoctorsByTenant);
router.get('/tenant/:doctorId', getDoctorInfoByTenant);
router.put('/tenant/:doctorId', updateDoctorByTenant);
router.delete('/tenant/:doctorId', deleteDoctorByTenant);

module.exports = router;
