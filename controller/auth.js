const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Register a user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  getTokenResponse(user, 200, res);
});

// @desc      Get  logged in
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Incorrect email or password", 400));
  }

  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
  getTokenResponse(user, 200, res);
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

const getTokenResponse = async (user, status, res) => {
  const token = await user.getToken();
  const option = {
    expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  res
    .status(status)
    .cookie("token", token, option)
    .json({ success: true, token, role: user.role });
};
