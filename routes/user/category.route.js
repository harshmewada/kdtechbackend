const express = require("express");
const { categoryController } = require("../../controllers/user");

const router = express.Router();

router.get("/", categoryController.all);
router.get("/products", categoryController.products);

module.exports = router;
