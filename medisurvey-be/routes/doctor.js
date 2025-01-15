const express = require('express');
const router = express.Router();
const { getAllDoctors, updateDoctor, deleteDoctor ,getDoctorInfo} = require('../controllers/doctorController');

router.get('/', getAllDoctors);

router.put('/:doctorId', updateDoctor);

router.delete('/:doctorId', deleteDoctor);

router.get('/:doctorId', getDoctorInfo);

module.exports = router;
