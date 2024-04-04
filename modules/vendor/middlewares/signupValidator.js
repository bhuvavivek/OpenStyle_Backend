const { body, validationResult } = require("express-validator");

const signupValidationRules = () => {
  return [
    body("shopName")
      .exists()
      .withMessage("Shop Name is required")
      .notEmpty()
      .withMessage("Shop Name cannot be empty"),

    body("emailAddress")
      .exists()
      .withMessage("email is required")
      .notEmpty()
      .withMessage("email cannot be empty")
      .isEmail()
      .withMessage(" email address is not valid"),

    body("phoneNumber")
      .exists()
      .withMessage("phoneNumber is required")
      .notEmpty()
      .withMessage("PhoneNumber cannot be empty")
      .isNumeric()
      .withMessage("PhoneNumber is not type number ")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phonenumber must be 10 digit"),

    body("totalSeats")
      .exists()
      .withMessage("totalSeats is required")
      .notEmpty()
      .withMessage("totalSeats cannot be empty")
      .isNumeric()
      .withMessage("totalSeats is not type number"),

    body("shopType")
      .exists()
      .withMessage("Shop Type is required")
      .notEmpty()
      .withMessage("Shop Type cannot be empty ")
      .isIn(["Salon", "Parlour", "Unisex Salon", "Spa"])
      .withMessage(
        "Shop Type must be one of ['Salon', 'Parlour', 'Unisex Salon', 'Spa']"
      ),

    body("shopAddress")
      .exists()
      .withMessage("Shop Address is required")
      .notEmpty()
      .withMessage("Shop Address cannot be empty"),

    body("password")
      .exists()
      .withMessage("password is required")
      .notEmpty()
      .withMessage("password cannot be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    body("userType")
      .exists()
      .withMessage("userType is required")
      .notEmpty()
      .withMessage("userType cannot be empty ")
      .isIn(["User", "Vendor"])
      .withMessage("userType mus be one of ['User','Vendor']"),

    body("lattitude")
      .exists()
      .withMessage("lattitude is required")
      .notEmpty()
      .withMessage("lattitude cannot be empty "),

    body("longitude")
      .exists()
      .withMessage("longitude is required")
      .notEmpty()
      .withMessage("longitude cannot be empty "),
  ];
};

const signupvalidate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  signupValidationRules,
  signupvalidate,
};
