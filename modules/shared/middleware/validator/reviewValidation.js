const { validationResult, body } = require("express-validator");

const reviewValidationRule = () => {
  return [
    body("vendorId")
      .exists()
      .withMessage("vendorId is required")
      .notEmpty()
      .withMessage("vendorId cannot be empty"),

    body("rating")
      .exists()
      .withMessage("rating is required")
      .notEmpty()
      .withMessage("rating cannot be empty")
      .isNumeric()
      .withMessage("rating must be a number")
      .bail()
      .isFloat({ min: 1, max: 5 })
      .withMessage("Provided Rating must be within 1 and 5"),

    body("review")
      .exists()
      .withMessage("review is required")
      .notEmpty()
      .withMessage("review cannot be empty"),

    body("title")
      .exists()
      .withMessage("title is required")
      .notEmpty()
      .withMessage("title cannot be empty"),
  ];
};

module.exports = { reviewValidationRule };
