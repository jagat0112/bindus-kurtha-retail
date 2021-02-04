const express = require("express");
const { protect } = require("../middleware/auth");
const { register, login, getMe } = require("../controller/auth");
const CartRoute = require("./cart");

const router = express.Router();

router.use("/:id/cart", CartRoute);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);

module.exports = router;
