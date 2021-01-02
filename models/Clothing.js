const mongoose = require("mongoose");

const ClothingSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the product is required"],
    unique: true,
    trim: true,
    maxLenght: [50, "Maximum lenght is 50 characters"],
  },
  description: {
    type: String,
    maxLenght: [1000, "Maximum lenght is 50 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price of the product is required"],
  },
  discount: {
    type: Number,
  },
  finalPrice: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
    enum: ["Kurtha", "Sari"],
  },
  size: {
    type: [Number],
    required: [true, "Sizes of the product is required"],
  },
  colors: {
    type: [String],
    required: [true, "Colors of the product is required"],
  },
  publish: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Clothing", ClothingSchema);
