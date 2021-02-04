const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");

// @desc      Get Reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/clothings/:clothingId/reviews
// @access    Public

exports.showReview = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const review = await Review.find({
      clothing: req.params.productId,
    }).populate("reviews");
    if (!review) {
      next(
        new ErrorResponse(`No Review found with id:${req.params.productId}`)
      );
      console.log(`No Review found with id ${req.params.productId}`);
    }
    res.status(200).json({ success: true, review });
  } else {
    const review = await Review.find();
    res.status(200).json({ success: true, reviews: review });
  }
});

//  @desc      Add Reviews
// @route     POST /api/v1/clothings/:clothingId/reviews
// @access    Private

exports.addReview = asyncHandler(async (req, res, next) => {
  let newReview = req.body;
  newReview.clothing = req.params.productId;
  newReview.user = req.user._id;
  newReview.username = req.user.name;

  try {
    const review = await Review.create(newReview);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.log(error);
  }
});

// @desc      Update Review
// @route     PUT /api/v1/reviews/:id
// @access    Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (
    req.user._id.toString() !== review.user.toString() ||
    req.user.role === "admin"
  ) {
    next(new ErrorResponse("Not Authorized", 401));
  }
  try {
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!review) {
      next(new ErrorResponse("Review Not Found", 401));
    }
    res.status(200).json({ success: true, review });
  } catch (error) {
    // console.log(error);
  }
});

// @desc      Delete Reviews
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorResponse("Review Not Found", 401));
  }

  console.log(review.user);
  if (
    req.user._id.toString() !== review.user.toString() ||
    req.user.role === "admin"
  ) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  await Review.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, msg: "Successfully Deleted" });
});
