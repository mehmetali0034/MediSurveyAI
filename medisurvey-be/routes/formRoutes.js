const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.use(authMiddleware);

router.get('/', checkRole(['doctor', 'admin']), formController.getAllForms);
router.get('/:id', checkRole(['doctor', 'admin']), formController.getForm);

router.post('/', checkRole(['admin']), formController.createForm);
router.put('/:id', checkRole(['admin']), formController.updateForm);
router.delete('/:id', checkRole(['admin']), formController.deleteForm);

router.get('/tenant/all', checkRole(['tenant']), formController.getAllFormsForTenant);
router.get('/tenant/:id', checkRole(['tenant']), formController.getFormForTenant);
router.put('/tenant/:id', checkRole(['tenant']), formController.updateFormForTenant);
router.delete('/tenant/:id', checkRole(['tenant']), formController.deleteFormForTenant);

module.exports = router; 