const express = require("express");
const platforms = require("./platform.route")
const auth = require("./auth.route");
const user = require("./user.route");
const categories = require("./category.route");
const products = require("./product.route");
const offers = require("./offer.route");

const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);
router.use("/platforms", platforms)
router.use("/categories", categories)
router.use("/products", products)
router.use("/offers", offers)

module.exports = router;
