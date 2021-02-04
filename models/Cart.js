const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Clothing",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  discount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  finalPrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", ChartSchema);
