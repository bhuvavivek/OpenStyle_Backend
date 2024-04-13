const { Schema, model } = require("mongoose");

const vendorReviewSchema = new Schema(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

vendorReviewSchema.index({ user: 1, vendor: 1 }, { unique: true });

const VendorReview = model("VendorReview", vendorReviewSchema);
module.exports = VendorReview;
