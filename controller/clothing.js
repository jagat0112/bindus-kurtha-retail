const Clothing = require("../models/Clothing");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

// @desc Show all clothings
// route GET/api/v1/clothings
// Access Public
exports.showClothings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Show a Single clothins
// route GET/api/v1/clothins/:id
// Access Public
exports.showClothing = asyncHandler(async (req, res, next) => {
  const clothings = await Clothing.findById(req.params.id).populate("reviews");
  if (!clothings) {
    return next(new ErrorResponse("Clothing Not Found", 404));
  }
  res.status(200).json({ success: true, data: clothings });
});

// @desc Add a clothings
// route POST/api/v1/clothing
// Access Private
exports.addClothing = asyncHandler(async (req, res, next) => {
  if (!req.body.discount) {
    req.body.finalPrice = req.body.price;
  }
  const clothings = await Clothing.create(req.body);

  res.status(200).json({ success: true, data: clothings });
});

// @desc Update a Single clothing
// route PUT /api/v1/clothings/:id
// Access Private
exports.updateClothing = asyncHandler(async (req, res, next) => {
  const clothings = await Clothing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!clothings) {
    return next(new ErrorResponse("Clothing Not Found", 404));
  }
  res.status(200).json({ success: true, data: clothings });
});

// @desc Delete a Single clothing
// route DELETE /api/v1/clothins/:id
// Access Private
exports.deleteClothing = asyncHandler(async (req, res, next) => {
  const clothings = await Clothing.findByIdAndDelete(req.params.id);
  if (!clothings) {
    return next(new ErrorResponse("Clothing Not Found", 404));
  }
  res.status(200).json({ success: true, data: [] });
});

// @desc Upload an image
// route UPLOAD /api/v1/clothings/:bootcampID/photo
// Access Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const clothings = await Clothing.findById(req.params.id);
  if (!clothings) {
    return next(new ErrorResponse("Clothing Not Found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`No file selected`, 400));
  }

  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Image should be less than 10MB`, 400));
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 400));
    }

    await Clothing.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });

    res.status(200).json({ success: true, data: file.name });
  });
});
