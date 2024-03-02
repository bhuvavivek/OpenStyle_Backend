const { Router } = require("express");
const passwordcontroller = require("../controllers/passwordcontroller");
const { otpVerification } = require("../middleware/verifyOtp");
const {
  ForgotPasswordCalidationRules,
  ForgotPasswordvalidate,
} = require("../middleware/forgotpassword");
const { setFlag } = require("../utils/setflag");
const {
  phoneValidationRules,
  phoneValidate,
} = require("../middleware/phoneValidation");
const { generateAndSendOtp } = require("../controllers/handleOtp");

const router = Router();

router.post(
  "/",
  ForgotPasswordCalidationRules(),
  ForgotPasswordvalidate,
  setFlag(true),
  otpVerification,
  passwordcontroller.forgotPassword
);

router.post(
  "/sendotp",
  phoneValidationRules(),
  phoneValidate,
  setFlag(true),
  generateAndSendOtp
);

module.exports = router;
