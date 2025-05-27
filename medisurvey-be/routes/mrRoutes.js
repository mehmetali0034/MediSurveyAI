const express = require('express');
const router = express.Router();
const mrController = require('../controllers/mrController');
const authMiddleware = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Get all MRs for a doctor
router.get('/doctor', mrController.getDoctorMRs);

// Upload MR image
router.post('/upload', mrController.uploadMR);

// Analyze MR
router.post('/:id/analyze', mrController.analyzeMR);

// Get all MRs for a patient
router.get('/patient/:patientId', mrController.getPatientMRs);

// Get MR details
router.get('/:id', mrController.getMRDetails);

// Delete MR
router.delete('/:id', mrController.deleteMR);

module.exports = router; 