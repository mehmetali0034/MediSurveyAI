const express = require('express');
const router = express.Router();
const { 
  adminRegisterDoctor, 
  registerDoctor, 
  loginDoctor, 
  registerTenant, 
  loginTenant 
} = require('../controllers/authController');

const {adminDoctorOnlyMiddleware, tenantOnlyMiddleware} = require('../middlewares/auth');

router.post('/tenant/register-doctor', tenantOnlyMiddleware, adminRegisterDoctor);

router.post('/admin/register-doctor', adminDoctorOnlyMiddleware, registerDoctor);

router.post('/login-doctor', loginDoctor);

router.post('/tenant/register', registerTenant);

router.post('/tenant/login', loginTenant);

module.exports = router;

