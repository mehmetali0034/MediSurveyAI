const express = require('express');
const router = express.Router();
const formAnswersController = require('../controllers/formAnswersController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.use(authMiddleware);

router.get('/', checkRole(['doctor', 'admin']), formAnswersController.getAllFormAnswers);
router.get('/:id', checkRole(['doctor', 'admin']), formAnswersController.getFormAnswer);

router.post('/', checkRole(['admin']), formAnswersController.createFormAnswer);
router.put('/:id', checkRole(['admin']), formAnswersController.updateFormAnswer);
router.delete('/:id', checkRole(['admin']), formAnswersController.deleteFormAnswer);

router.get('/tenant/all', checkRole(['tenant']), formAnswersController.getAllFormAnswersForTenant);
router.get('/tenant/:id', checkRole(['tenant']), formAnswersController.getFormAnswerForTenant);
router.put('/tenant/:id', checkRole(['tenant']), formAnswersController.updateFormAnswerForTenant);
router.delete('/tenant/:id', checkRole(['tenant']), formAnswersController.deleteFormAnswerForTenant);

module.exports = router; 