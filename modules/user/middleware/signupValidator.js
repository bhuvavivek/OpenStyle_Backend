const { body, validationResult } = require("express-validator");

// define a validations rule

const signupValidationRules = () => {
  return [
    body("fullName")
      .exists()
      .withMessage("fullName is required")
      .notEmpty()
      .withMessage("fullName cannot be empty"),

    body("gender")
      .exists()
      .withMessage("gender is required")
      .notEmpty()
      .withMessage("gender cannot be empty")
      .isIn(["Male", "Female", "Other"])
      .withMessage("gender must be one of ['Male', 'Female', 'Other']"),

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
      .withMessage("email is required")
      .notEmpty()
      .withMessage("email cannot be empty")
      .isEmail()
      .withMessage(" email address is not valid"),
    // password must be at least 6 characters long and contain at least one uppercase letter , one lowercase letter and one synbol,
    body("password")
      .exists()
      .withMessage("password is required")
      .notEmpty()
      .withMessage("password cannot be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("otp")
      .exists()
      .withMessage("otp is required")
      .notEmpty()
      .withMessage("otp cannot be empty")
      .isLength({ min: 6, max: 6 })
      .withMessage("otp must be 6 digit"),

    body("userType")
      .exists()
      .withMessage("userType is required")
      .notEmpty()
      .withMessage("userType cannot be empty ")
      .isIn(["User", "Vendor"])
      .withMessage("userType mus be one of ['User','Vendor']"),
  ];
};

const signupvalidate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    message: extractedErrors[0],
  });
};

module.exports = { signupValidationRules, signupvalidate };
