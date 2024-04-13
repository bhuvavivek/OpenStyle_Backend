const { Router } = require("express");
const { authenticate } = require("../middleware/authenticate");
const ReviewController = require("../controllers/reviewController");
const {
  reviewValidationRule,
} = require("../middleware/validator/reviewValidation");
const { globalValidate } = require("../middleware/validator/globalvalidator");

const router = Router();

router.use(authenticate);

router
  .route("/")
  .put(reviewValidationRule(), globalValidate, ReviewController.addReviews)
  .get(ReviewController.getReviews);

router.get("/:id", ReviewController.getReview);
module.exports = router;
