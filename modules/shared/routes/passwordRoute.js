const { Router } = require("express");
const passwordcontroller = require("../controllers/passwordcontroller");
const { otpVerification } = require("../middleware/verifyOtp");
const {
  ForgotPasswordvalidationRules,
  ForgotPasswordvalidate,
} = require("../middleware/forgotpassword");
const { setFlag } = require("../utils/setflag");
const {
  phonePasswordValidationRules,
  phoneValidate,
} = require("../middleware/phoneValidation");
const { generateAndSendOtp } = require("../controllers/handleOtp");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.post(
  "/",
  ForgotPasswordvalidationRules(),
  ForgotPasswordvalidate,
  setFlag(true),
  otpVerification,
  passwordcontroller.forgotPassword
);

router.post(
  "/sendotp",
  phonePasswordValidationRules(),
  phoneValidate,
  setFlag(true),
  generateAndSendOtp
);

router.post("/change", authenticate, passwordcontroller.changePassword);

module.exports = router;
