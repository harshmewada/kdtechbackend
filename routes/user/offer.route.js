const express = require("express");
const { offerController } = require("../../controllers/user");

const router = express.Router();

router.get("/", offerController.all);

module.exports = router;
