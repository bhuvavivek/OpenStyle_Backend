const { body } = require("express-validator");

const aboutValidationRule = () => {
  return [
    body("aboutText")
      .optional()
      .isString()
      .withMessage("About text must be a string"),

    body("aminities.wifi")
      .optional()
      .isBoolean()
      .withMessage("Wifi must be a boolean"),

    body("aminities.ac")
      .optional()
      .isBoolean()
      .withMessage("AC must be a boolean"),

    body("aminities.tv")
      .optional()
      .isBoolean()
      .withMessage("TV must be a boolean"),

    body("aminities.beverage")
      .optional()
      .isBoolean()
      .withMessage("Beverage must be a boolean"),

    body("aminities.parking")
      .optional()
      .isBoolean()
      .withMessage("Parking must be a boolean"),

    body("aminities.cardPayment")
      .optional()
      .isBoolean()
      .withMessage("Card Payment must be a boolean"),

    body("aminities.ccTV")
      .optional()
      .isBoolean()
      .withMessage("CCTV must be a boolean"),

    body("aminities.petFriendly")
      .optional()
      .isBoolean()
      .withMessage("Pet Friendly must be a boolean"),

    body("aminities.selfiePoint")
      .optional()
      .isBoolean()
      .withMessage("Selfie Point must be a boolean"),

    body("aminities.music")
      .optional()
      .isBoolean()
      .withMessage("Music must be a boolean"),
  ];
};

const aboutValidate = (req, res, next) => {
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

module.exports = { aboutValidationRule, aboutValidate };
