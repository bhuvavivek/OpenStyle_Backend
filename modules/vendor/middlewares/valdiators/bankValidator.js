const { body } = require("express-validator");

const bankValidationRule = () => {
  return [
    body("accountHolderName")
      .optional()
      .notEmpty()
      .withMessage("accountHolderName cannot empty"),
    body("accountNumber")
      .optional()
      .notEmpty()
      .withMessage("accountNumber cannot empty"),
    body("bankName").optional().notEmpty().withMessage("bankName cannot empty"),
    body("branchName")
      .optional()
      .notEmpty()
      .withMessage("branchName cannot empty"),
    body("ifscCode").optional().notEmpty().withMessage("ifscCode cannot empty"),
  ];
};

const newBankValidationRule = () => {
  return [
    body("accountHolderName")
      .exists()
      .withMessage("Account holder name is required")
      .notEmpty()
      .withMessage("accountHolderName cannot empty"),

    body("accountNumber")
      .exists()
      .withMessage("Account number is required")
      .notEmpty()
      .withMessage("accountNumber cannot empty")
      .isNumeric()
      .withMessage("Account number must be numeric"),

    body("bankName")
      .exists()
      .withMessage("Bank name is required")
      .notEmpty()
      .withMessage("bankName cannot empty"),

    body("branchName")
      .exists()
      .withMessage("Branch name is required")
      .notEmpty()
      .withMessage("branchName cannot empty"),

    body("ifscCode")
      .exists()
      .withMessage("IFSC code is required")
      .notEmpty()
      .withMessage("ifscCode cannot empty"),
  ];
};

module.exports = {
  bankValidationRule,
  newBankValidationRule,
};
