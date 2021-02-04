const Cart = require("../models/Cart");
const Clothing = require("../models/Clothing");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.find({ user: req.params.id }).populate({
    path: "product",
    select: "name price discount finalPrice photo",
  });
  if (!cart) {
    return next(
      new ErrorResponse(`No Cart found with Id of ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, count: cart.length, cart });
});

exports.addItemInCart = asyncHandler(async (req, res, next) => {
  const product = await Clothing.findById(req.params.id);
  if (!product) {
    return next(new ErrorResponse("No Product Found", 400));
  }
  let newItem = req.body;
  newItem.user = req.user._id;
  newItem.product = req.params.id;

  const item = await Cart.create(newItem);
  res.status(200).json({ item });
});

exports.deleteItemInCart = asyncHandler(async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

exports.updateItemInCart = asyncHandler(async (req, res, next) => {
  const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  }).populate("clothing");
  res.status(200).json({ success: true, cart: updated });
});
