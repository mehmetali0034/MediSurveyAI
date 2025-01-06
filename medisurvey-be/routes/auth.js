const express = require('express');
<<<<<<< HEAD
const { register, login } = require('../controllers/authController.js');
=======
>>>>>>> 0b0364082c3f02f3f1fd2a7530f40098ecda3f63
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

<<<<<<< HEAD
// Kullanıcı kaydı ve girişi rotalarını tanımlar
router.post('/register', register);
router.post('/login', login);
module.exports = router;
=======
router.post('/tenant/login', loginTenant);

module.exports = router;
>>>>>>> 0b0364082c3f02f3f1fd2a7530f40098ecda3f63
