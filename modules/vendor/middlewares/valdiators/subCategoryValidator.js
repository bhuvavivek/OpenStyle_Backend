const { body, validationResult } = require("express-validator");

const subCategoryValidationRule = () => {
  return [
    body("subCategoryName")
      .exists()
      .withMessage("subCategoryName is Required")
      .notEmpty()
      .withMessage("subCategoryName cannot be empty"),

    body("categoryId")
      .exists()
      .withMessage("categoryId is Required")
      .notEmpty()
      .withMessage("categoryId cannot be empty"),
  ];
};

const subCategoryValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  subCategoryValidationRule,
  subCategoryValidator,
};
