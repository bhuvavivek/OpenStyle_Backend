const { body, validationResult } = require("express-validator");

const ForgotPasswordvalidationRules = () => {
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

    body("userType")
      .exists()
      .withMessage("userType is required")
      .notEmpty()
      .withMessage("userType cannot be empty ")
      .isIn(["User", "Vendor"])
      .withMessage("userType mus be one of ['User','Vendor']"),

    body("newPassword")
      .exists()
      .withMessage("newPassword is required")
      .notEmpty()
      .withMessage("newPassword cannot be empty")
      .isLength({ min: 6 })
      .withMessage("newPassword must be at least 6 characters"),
    body("otp")
      .exists()
      .withMessage("otp is required")
      .notEmpty()
      .withMessage("otp cannot be empty"),
  ];
};

const ForgotPasswordvalidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

const PassWordvalidationRule = () => {
  return [
    body("newPassword")
      .exists()
      .withMessage("newPassword is required")
      .notEmpty()
      .withMessage("newPassword cannot be empty")
      .isLength({ min: 6 })
      .withMessage("newPassword must be at least 6 characters"),

    body("oldPassword")
      .exists()
      .withMessage("oldPassword is required")
      .notEmpty()
      .withMessage("oldPassword cannot be empty")
      .isLength({ min: 6 })
      .withMessage("oldPassword must be at least 6 characters"),
  ];
};

module.exports = {
  ForgotPasswordvalidationRules,
  PassWordvalidationRule,
  ForgotPasswordvalidate,
};
