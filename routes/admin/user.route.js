const express = require('express');
const { userController } = require('../../controllers/admin')

const router = express.Router();

router.get('/', userController.all)
router.post('/create', userController.create)
router.put('/update', userController.update)
router.delete('/delete', userController.remove)

module.exports = router;
