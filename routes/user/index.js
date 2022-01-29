const express = require("express");
const router = express.Router();
const auth = require("./auth.route");
const explore = require("./explore.route");
const util = require("./util.route");
const category = require("./category.route");
const product = require("./product.route");
const offer = require("./offer.route");
const notification = require("./notification.route");

router.use("/", auth);
router.use("/explore", explore);
router.use("/util", util);
router.use("/category", category);
router.use("/product", product);
router.use("/offers", offer);
router.use("/notification", notification);

module.exports = router;
