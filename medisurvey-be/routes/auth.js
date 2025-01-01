const express = require('express');
const { register, login } = require('../controllers/authController');
const { isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register); 
router.post('/login', login); 

router.post('/admin/add-doctor', isAdmin, register); 

module.exports = router;
