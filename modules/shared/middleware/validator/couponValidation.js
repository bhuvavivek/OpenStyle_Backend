const { validationResult, body } = require("express-validator");

const couponValidationRule = () => {
  return [
    body("coupenName")
      .exists()
      .withMessage("coupenName is required")
      .notEmpty()
      .withMessage("coupenName cannot be empty"),

    body("coupenType")
      .exists()
      .withMessage("coupenType is required")
      .notEmpty()
      .withMessage("couponType cannot be empty")
      .isIn(["Vendor", "OpenStyle"])
      .withMessage("coupenType must be one of ['Vendor','OpenStyle']"),

    body("minApplciableOrderPrice")
      .exists()
      .withMessage("minApplciableOrderPrice is required")
      .notEmpty()
      .withMessage("minApplciableOrderPrice cannot be empty")
      .isNumeric()
      .withMessage("minApplciableOrderPrice must be a number")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Minimum applicable order price must be a positive number"),

    body("maxDiscountPrice")
      .exists()
      .withMessage("maxDiscountPrice is required")
      .notEmpty()
      .withMessage("maxDiscountPrice cannot be empty")
      .isNumeric()
      .withMessage("Maximum discount price must be a number")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Maximum discount price must be a positive number"),

    body("discountPercentage")
      .exists()
      .withMessage("discountPercentage is required")
      .notEmpty()
      .withMessage("discountPercentage cannot be empty")
      .isNumeric()
      .withMessage("Discount percentage must be a number")
      .bail()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100"),

    body("expireDate")
      .exists()
      .withMessage("expireDate is required")
      .notEmpty()
      .withMessage("Expire date cannot be empty")
      .isISO8601()
      .withMessage("Expire date must be a valid date in the format YYYY-MM-DD"),
  ];
};

const couponValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  return res.status(422).json({ message: extractedErrors[0] });
};
module.exports = {
  couponValidationRule,
  couponValidate,
};
