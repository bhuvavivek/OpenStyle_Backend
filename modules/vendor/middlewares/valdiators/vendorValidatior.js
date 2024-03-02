const { body, validationResult } = require("express-validator");

const vendorValidationRule = () => {
  return [
    body("shopName")
      .optional()
      .notEmpty()
      .withMessage("Shop Name cannot be empty"),

    body("emailAddress")
      .optional()
      .notEmpty()
      .withMessage("email cannot be empty")
      .isEmail()
      .withMessage(" email address is not valid"),

    body("phoneNumber")
      .optional()
      .notEmpty()
      .withMessage("PhoneNumber cannot be empty")
      .isNumeric()
      .withMessage("PhoneNumber is not type number ")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phonenumber must be 10 digit"),

    body("totalSeats")
      .optional()
      .notEmpty()
      .withMessage("totalSeats cannot be empty")
      .isNumeric()
      .withMessage("totalSeats is not type number"),

    body("shopType")
      .optional()
      .notEmpty()
      .withMessage("Shop Type cannot be empty ")
      .isIn(["Salon", "Parlour", "Unisex Salon", "Spa"])
      .withMessage(
        "Shop Type must be one of ['Salon', 'Parlour', 'Unisex Salon', 'Spa']"
      ),

    body("shopAddress")
      .optional()
      .notEmpty()
      .withMessage("Shop Address cannot be empty"),
  ];
};

const paswordValidationRule = () => {
  return [
    body("vendorId")
      .exists()
      .withMessage("vendorId is Required")
      .notEmpty()
      .withMessage("vendorId cannot be empty"),

    body("oldPassword")
      .exists()
      .withMessage("oldPassword is Required")
      .notEmpty()
      .withMessage("oldPassword cannot be empty")
      .isLength({ min: 6 })
      .withMessage("oldPassword must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("newPassword")
      .exists()
      .withMessage("newPassword is Required")
      .notEmpty()
      .withMessage("newPassword cannot be empty")
      .isLength({ min: 6 })
      .withMessage("newPassword must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  ];
};

const vendorValidate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => {
    extractedErrors.push(err.msg);
  });

  return res.status(422).json({ message: extractedErrors[0] });
};

module.exports = {
  vendorValidationRule,
  vendorValidate,
  paswordValidationRule,
};
