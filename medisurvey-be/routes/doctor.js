const express = require('express');
const router = express.Router();
const { getAllDoctors, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

router.get('/', getAllDoctors);

router.put('/:doctorId', updateDoctor);

router.delete('/:doctorId', deleteDoctor);

module.exports = router;
