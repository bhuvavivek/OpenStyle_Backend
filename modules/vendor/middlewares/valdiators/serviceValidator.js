const { body, validationResult } = require("express-validator");

const serviceValidationRule = () => {
  return [
    body("serviceName")
      .exists()
      .withMessage("serviceName is Required")
      .notEmpty()
      .withMessage("serviceName cannot be empty"),

    body("subCategoryId")
      .exists()
      .withMessage("subCategoryId is Required")
      .notEmpty()
      .withMessage("subCategoryId cannot be empty"),
  ];
};

const serviceValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  serviceValidationRule,
  serviceValidator,
};
