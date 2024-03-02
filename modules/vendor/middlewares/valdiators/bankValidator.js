const { body } = require("express-validator");

const bankValidationRule = () => {
  return [
    body("accountHolderName")
      .optional()
      .isEmpty()
      .withMessage("accountHolderName cannot empty"),
    body("accountNumber")
      .optional()
      .isEmpty()
      .withMessage("accountNumber cannot empty"),
    body("bankName").optional().isEmpty().withMessage("bankName cannot empty"),
    body("branchName")
      .optional()
      .isEmpty()
      .withMessage("branchName cannot empty"),
    body("ifscCode").optional().isEmpty().withMessage("ifscCode cannot empty"),
  ];
};

module.exports = {
  bankValidationRule,
};
