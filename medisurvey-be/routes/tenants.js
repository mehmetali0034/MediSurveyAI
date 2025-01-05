const express = require('express');
const router = express.Router();
const { getAllTenants, updateTenant, deleteTenant } = require('../controllers/tenantsController');

router.get('/', getAllTenants);

router.put('/:tenantId', updateTenant);

router.delete('/:tenantId', deleteTenant);

module.exports = router;
