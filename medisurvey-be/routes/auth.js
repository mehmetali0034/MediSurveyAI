const express = require('express');
const { register, login } = require('../controllers/authController.js');
const router = express.Router();

// Kullanıcı kaydı ve girişi rotalarını tanımlar
router.post('/register', register);
router.post('/login', login);
module.exports = router;
