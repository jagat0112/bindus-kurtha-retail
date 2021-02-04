const express = require("express");
const {
  showReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controller/review");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(showReview).post(protect, addReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
