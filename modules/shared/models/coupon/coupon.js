const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    coupenName: {
      type: String,
      required: { value: true, message: "coupen name is required" },
    },
    coupenCode: {
      type: String,
      required: { value: true, message: "coupen code is required" },
    },
    coupenType: {
      type: String,
      required: true,
      enum: ["Vendor", "OpenStyle"],
      default: "Vendor",
    },
    minApplciableOrderPrice: {
      type: Number,
      required: { value: true, message: "minApplciableOrderPrice is required" },
      min: [0, "Minimum applicable order price must be a positive number"],
    },
    maxDiscountPrice: {
      type: Number,
      required: { value: true, message: "maxDiscountPriceis required" },
      min: [0, "Max Discount price must be a positive number"],
    },
    discountPercentage: {
      type: Number,
      equired: { value: true, message: "discountPercentage required" },
      min: [0, " Discount percentage must be a positive number"],
      max: [100, "Discounf percentage must be "],
    },
    expireDate: {
      type: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

const Coupon = model("Coupon", couponSchema);
module.exports = Coupon;
