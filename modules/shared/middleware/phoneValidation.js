const { body, validationResult } = require("express-validator");

const phoneValidationRules = () => {
  return [
    body("phoneNumber")
      .exists()
      .withMessage("phoneNumber is required")
      .notEmpty()
      .withMessage("PhoneNumber cannot be empty")
      .isNumeric()
      .withMessage("PhoneNumber is not type number ")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phonenumber must be 10 digit"),

    body("emailAddress")
      .exists()
      .withMessage("emailAddress is required")
      .notEmpty()
      .withMessage("emailAddress cannot be empty")
      .isEmail()
      .withMessage(" email address is not valid"),

    body("userType")
      .exists()
      .withMessage("userType is required")
      .notEmpty()
      .withMessage("userType cannot be empty ")
      .isIn(["User", "Vendor"])
      .withMessage("userType mus be one of ['User','Vendor']"),
  ];
};

const phoneValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  phoneValidationRules,
  phoneValidate,
};
