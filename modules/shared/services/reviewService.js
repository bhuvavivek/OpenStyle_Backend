const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor");
const VendorReview = require("../models/vendorReviews");

class ReviewService {
  getReviews = async (vendorId) => {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const reviews = await VendorReview.find({ vendor: vendorId }).populate(
        "user"
      );
      return reviews;
    } catch (error) {
      throw error;
    }
  };

  addReviews = async (userReview) => {
    try {
      const vendor = await Vendor.findById(userReview.vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const user = await User.findById(userReview.userId);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const review = await VendorReview.create({
        vendor: userReview.vendorId,
        user: userReview.userId,
        rating: userReview.rating,
        review: userReview.review,
        title: userReview.title,
      });

      return review;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ReviewService();
