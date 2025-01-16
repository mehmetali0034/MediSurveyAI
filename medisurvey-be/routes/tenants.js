const express = require('express');
const router = express.Router();
const { getAllTenants, updateTenant, deleteTenant ,getTenantInfo} = require('../controllers/tenantsController');

router.get('/', getAllTenants);

router.put('/:tenantId', updateTenant);

router.delete('/:tenantId', deleteTenant);

router.get('/:tenantId', getTenantInfo);

module.exports = router;
