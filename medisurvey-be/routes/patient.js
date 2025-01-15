const express = require('express');
const {
  addPatient,
  getPatientInfo,
  updatePatient,
  deletePatient,
  getAllPatients,
} = require('../controllers/patientsController.js');

const router = express.Router();

router.post('/add-patient', addPatient);

router.get('/:id', getPatientInfo);

router.get('/', getAllPatients);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

module.exports = router;
