const express = require('express');
const utilController = require('../../controllers/util.controller')
const router = express.Router();

router.get('/file/:id', utilController.getImage)

module.exports = router;
