const express = require("express");
const { notficationController } = require("../../controllers/user");

const router = express.Router();

router.post("/register", notficationController.register);
router.post('/sendnotification', notficationController.sendNotifications)


module.exports = router;
