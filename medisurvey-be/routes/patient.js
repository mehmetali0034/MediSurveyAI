const express = require('express');
const {
  addPatient,
  addPatientByTenant,
  getPatientInfo,
  getPatientInfoByTenant,
  updatePatient,
  updatePatientByTenant,
  deletePatient,
  deletePatientByTenant,
  getAllPatients,
  getAllPatientsByTenant,
} = require('../controllers/patientsController.js');

const router = express.Router();

// Doktor ve Admin Doktor route'ları
router.get('/all', getAllPatients);
router.post('/add', addPatient);
router.get('/:id', getPatientInfo);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

// Tenant route'ları
router.get('/tenant/all', getAllPatientsByTenant);
router.post('/tenant/add', addPatientByTenant);
router.get('/tenant/:id', getPatientInfoByTenant);
router.put('/tenant/:id', updatePatientByTenant);
router.delete('/tenant/:id', deletePatientByTenant);

module.exports = router;
