const express = require("express");
const {
  getCart,
  addItemInCart,
  deleteItemInCart,
  updateItemInCart,
} = require("../controller/cart");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getCart).post(protect, addItemInCart);
router
  .route("/:id")
  .put(protect, updateItemInCart)
  .delete(protect, deleteItemInCart);

module.exports = router;
