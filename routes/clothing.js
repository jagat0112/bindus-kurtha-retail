const express = require("express");
const {
  showClothings,
  showClothing,
  addClothing,
  deleteClothing,
  updateClothing,
  uploadPhoto,
} = require("../controller/clothing");
const { authorize, protect } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");
const Clothing = require("../models/Clothing");
const router = express.Router();

router
  .route("/")
  .get(advancedResults(Clothing), showClothings)
  .post(protect, authorize("admin"), addClothing);
router
  .route("/:id")
  .get(showClothing)
  .delete(deleteClothing)
  .put(updateClothing);
router.route("/:id/image").put(uploadPhoto);

module.exports = router;
