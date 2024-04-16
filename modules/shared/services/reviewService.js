const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor");
const VendorReview = require("../models/vendorReviews");

class ReviewService {
  getReviews = async (vendorId, limit) => {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      let reviews;
      if (limit && !isNaN(limit)) {
        reviews = await VendorReview.find({ vendor: vendorId })
          .populate("user")
          .limit(3)
          .sort({ createdAt: -1 });
      } else {
        reviews = await VendorReview.find({ vendor: vendorId })
          .populate("user")
          .sort({ createdAt: -1 });
      }

      return {
        reviews,
        averageRating: vendor.averageRating,
        totalRatingCount: vendor.ratingsCount,
      };
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

      const reviewExists = await VendorReview.findOne({
        vendor: userReview.vendorId,
        user: userReview.userId,
      });

      if (reviewExists) {
        reviewExists.rating = userReview.rating;
        reviewExists.review = userReview.review;
        reviewExists.title = userReview.title;

        await reviewExists.save();
        return reviewExists;
      }

      const review = await new VendorReview({
        vendor: userReview.vendorId,
        user: userReview.userId,
        rating: userReview.rating,
        review: userReview.review,
        title: userReview.title,
      });
      await review.save();

      return review;
    } catch (error) {
      throw error;
    }
  };

  getReview = async (vendorId, userId) => {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const user = await User.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const review = await VendorReview.findOne({
        vendor: vendorId,
        user: userId,
      });

      return review;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ReviewService();
