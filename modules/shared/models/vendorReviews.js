const { Schema, model } = require("mongoose");
const Vendor = require("../../vendor/models/vendor");

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

vendorReviewSchema.pre("save", async function (next) {
  try {
    const review = this;
    const vendor = await Vendor.findById(review.vendor);

    if (!vendor) {
      throw new Error("Vendor not found");
    }

    if (review.isNew) {
      vendor.ratingsCount += 1;
      vendor.averageRating = parseFloat(
        (vendor.averageRating * (vendor.ratingsCount - 1) + review.rating) /
          vendor.ratingsCount
      ).toFixed(2);
    } else {
      // If the review is being updated , find the old review , substract its rating from the average rating and add the new rating , recalculate the average
      const oldReview = await VendorReview.findById(review._id);

      if (!oldReview) {
        throw new Error("Old review not found");
      }

      vendor.averageRating = parseFloat(
        (
          (vendor.averageRating * vendor.ratingsCount -
            oldReview.rating +
            review.rating) /
          vendor.ratingsCount
        ).toFixed(2)
      );
    }

    await vendor.save();
    next();
  } catch (error) {
    console.log(error);
    throw error;
  }
});

vendorReviewSchema.pre("remove", async function (next) {
  try {
    const review = this;
    // Check if the review is associated with a vendor
    if (!review.vendor) {
      throw new Error("Review is not associated with a vendor");
    }

    const vendor = await Vendor.findById(review.vendor);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    vendor.ratingsCount = Math.max(0, vendor.ratingsCount - 1);
    vendor.averageRating =
      vendor.ratingsCount > 0
        ? parseFloat(
            (vendor.averageRating * (vendor.ratingsCount + 1) - review.rating) /
              vendor.ratingsCount
          ).toFixed(2)
        : 0;

    await vendor.save();
    next();
  } catch (error) {
    throw error;
  }
});

const VendorReview = model("VendorReview", vendorReviewSchema);
module.exports = VendorReview;
