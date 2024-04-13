const ReviewService = require("../services/reviewService");
const moment = require("moment");

class ReviewController {
  async getReviews(req, res, next) {
    try {
      let vendorId;

      if (req.type === "USER" && !req.query.vendorId) {
        const error = new Error("vendorId is required");
        error.statusCode = 400;
        throw error;
      }

      if (req.query.vendorId && req.type === "USER") {
        vendorId = req.query.vendorId;
      }

      if (req.user.id && req.type === "VENDOR") {
        vendorId = req.user.id;
      }

      if (!vendorId) {
        const error = new Error("Vendor id is required");
        error.statusCode = 400;
        throw error;
      }

      let reviews = await ReviewService.getReviews(vendorId);

      if (!reviews || reviews.length === 0) {
        return res.status(200).json({
          message: "No reviews found",
          reviews: [],
        });
      }

      reviews = reviews.map((review) => {
        return {
          userProfile: review.user.userProfile,
          userName: review.user.fullName,
          rating: review.rating,
          review: review.review,
          title: review.title,
          reviewDate: moment(review.createdAt).format("DD-MM-YYYY"),
        };
      });
      return res.status(200).json({
        message: "Reviews fetched successfully",
        reviews,
      });
    } catch (error) {
      next(error);
    }
  }

  async addReviews(req, res, next) {
    try {
      if (req.type !== "USER") {
        const error = new Error("Only user can add reviews");
        error.statusCode = 400;
        throw error;
      }

      if (!req.user.id) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const review = req.body;

      review.userId = req.user.id;

      await ReviewService.addReviews(review);
      return res.status(201).json({
        message: "Review added successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
