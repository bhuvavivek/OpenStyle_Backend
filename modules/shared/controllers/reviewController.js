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

      const result = await ReviewService.getReviews(vendorId, req.query.limit);

      if (!result.reviews || result.reviews.length === 0) {
        return res.status(200).json({
          message: "No reviews found",
          reviews: [],
          averageRating: 0,
          totalRatingCount: 0,
        });
      }

      const reviews = result.reviews.map((review) => {
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
        reviews: reviews,
        averageRating: result.averageRating,
        totalRatingCount: result.totalRatingCount,
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

  async getReview(req, res, next) {
    try {
      if (req.type !== "USER") {
        const error = new Error("You Are Not Authorized to get review");
        error.statusCode = 400;
        throw error;
      }
      const vendorId = req.params.id;
      if (!vendorId) {
        const error = new Error("Vendor id is required");
        error.statusCode = 400;
        throw error;
      }

      const review = await ReviewService.getReview(vendorId, req.user.id);

      if (!review) {
        return res.status(200).json({
          message: "No review found",
          review: {
            rating: 3,
            review: "",
          },
        });
      }

      return res.status(200).json({
        message: "Review fetched successfully",
        review: {
          rating: review.rating,
          review: review.review,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
