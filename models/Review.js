const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Rating is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
  clothing: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Clothing",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.index({ clothing: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
