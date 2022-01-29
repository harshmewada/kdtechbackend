const express = require("express");
const upload = require("../../multer");
const { productController } = require("../../controllers/admin");

const router = express.Router();

router.get("/?:id", productController.all);
router.post("/create", upload.any(), productController.create);
router.put("/update", upload.any(), productController.update);
router.delete("/delete", productController.remove);
router.put("/toggleexpire", productController.toggleExpire);

module.exports = router;
