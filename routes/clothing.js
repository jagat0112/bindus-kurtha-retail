const express = require("express");
const { authorize, protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Clothing = require("../models/Clothing");
const reviewRoute = require("./review");
const CartRoute = require("./cart");
const router = express.Router();
const {
  showClothings,
  showClothing,
  addClothing,
  deleteClothing,
  updateClothing,
  uploadPhoto,
} = require("../controller/clothing");

router.use("/:productId/review", reviewRoute);
router.use("/:id/cart", CartRoute);

router
  .route("/")
  .get(advancedResults(Clothing, "reviews"), showClothings)
  .post(protect, authorize("admin"), addClothing);
router
  .route("/:id")
  .get(showClothing)
  .delete(deleteClothing)
  .put(updateClothing);
router.route("/:id/image").put(uploadPhoto);

module.exports = router;
