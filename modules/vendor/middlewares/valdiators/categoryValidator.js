const { body, validationResult } = require("express-validator");

const categoryValidationRule = () => {
  return [
    body("categoryName")
      .exists()
      .withMessage("categoryName is Required")
      .notEmpty()
      .withMessage("categoryName cannot be empty"),

    body("targetGender")
      .optional()
      .notEmpty()
      .withMessage("targetGender cannot be empty")
      .isIn(["Male", "Female", "Both"])
      .withMessage("targetGender  must be one of ['Male', 'Female', 'Both']"),

    body("vendorId")
      .exists()
      .withMessage("vendorId is Required")
      .notEmpty()
      .withMessage("vendorId cannot be empty"),
  ];
};

const categoryValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  categoryValidationRule,
  categoryValidator,
};
