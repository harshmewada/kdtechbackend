const express = require("express");
const { productController } = require("../../controllers/user");

const router = express.Router();

router.get("/", productController.all);
router.get("/search", productController.searchProduct)
router.get('/trending', productController.trending)

module.exports = router;
