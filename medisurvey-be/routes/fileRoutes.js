const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

router.use(authMiddleware);

router.get('/', checkRole(['doctor', 'admin']), fileController.getAllFiles);
router.get('/:id', checkRole(['doctor', 'admin']), fileController.getFile);

router.post('/', checkRole(['admin']), fileController.createFile);
router.put('/:id', checkRole(['admin']), fileController.updateFile);
router.delete('/:id', checkRole(['admin']), fileController.deleteFile);

router.get('/tenant/all', checkRole(['tenant']), fileController.getAllFilesForTenant);
router.get('/tenant/:id', checkRole(['tenant']), fileController.getFileForTenant);
router.put('/tenant/:id', checkRole(['tenant']), fileController.updateFileForTenant);
router.delete('/tenant/:id', checkRole(['tenant']), fileController.deleteFileForTenant);

module.exports = router; 