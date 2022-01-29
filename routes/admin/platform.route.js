const express = require('express');
const { platformController } = require('../../controllers/admin')
const upload = require('../../multer')

const router = express.Router();

router.get('/all', platformController.all)
router.post('/create', upload.any(), platformController.create)
router.put('/update', upload.any(), platformController.update)
router.delete('/delete', platformController.remove)

module.exports = router;
