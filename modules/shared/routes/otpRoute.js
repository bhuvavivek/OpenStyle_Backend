const { Router } = require("express");
const { generateAndSendOtp } = require("../controllers/handleOtp");
const {
  phoneValidationRules,
  phoneValidate,
} = require("../middleware/phoneValidation");

const router = Router();

router.post(
  "/sendotp",
  phoneValidationRules(),
  phoneValidate,
  generateAndSendOtp
);

module.exports = router;
