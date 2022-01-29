const express = require("express");
const { productController } = require("../../controllers/user");

const router = express.Router();

router.get("/", productController.all);

module.exports = router;
