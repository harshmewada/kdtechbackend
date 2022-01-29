const express = require('express');
const { offerController } = require('../../controllers/admin')
const upload = require('../../multer')

const router = express.Router();

router.get('/all', offerController.all)
router.post('/create', upload.any(), offerController.create)
router.put('/update', upload.any(), offerController.update)
router.delete('/delete', offerController.remove)

module.exports = router;
