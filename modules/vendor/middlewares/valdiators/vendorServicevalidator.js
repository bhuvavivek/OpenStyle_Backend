const { body, validationResult } = require("express-validator");

const vendorServiceValidationRule = () => {
  return [
    body("serviceId")
      .exists()
      .withMessage("Service ID is required")
      .notEmpty()
      .withMessage("Service ID cannot be empty"),

    body("servicePrice")
      .exists()
      .withMessage("Service price is required")
      .notEmpty()
      .withMessage("Service price cannot be empty")
      .isNumeric()
      .withMessage("Service price must be a number"),

    body("serviceDuration")
      .exists()
      .withMessage("Service Duration is required")
      .notEmpty()
      .withMessage("Service Duration cannot be empty")
      .isNumeric()
      .withMessage("Service Duration must be a number"),

    body("targetGender")
      .exists()
      .withMessage("targetGender is required")
      .notEmpty()
      .withMessage("targetGender cannot be empty")
      .isIn(["Male", "Female", "Both"])
      .withMessage(
        'Invalid value for targetGender , targetGender must be within ["Male", "Female", "Both"]'
      ),
  ];
};

const vendorServiceValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedError = [];
  errors.array().map((err) => extractedError.push(err.msg));
  return res.status(422).json({ message: extractedError[0] });
};

module.exports = {
  vendorServiceValidationRule,
  vendorServiceValidator,
};
