const { Router } = require("express");
const passwordcontroller = require("../controllers/passwordcontroller");
const { otpVerification } = require("../middleware/verifyOtp");
const {
  ForgotPasswordvalidationRules,
  ForgotPasswordvalidate,
  PassWordvalidationRule,
} = require("../middleware/forgotpassword");
const { setFlag } = require("../utils/setflag");
const {
  phonePasswordValidationRules,
  phoneValidate,
} = require("../middleware/phoneValidation");
const { generateAndSendOtp } = require("../controllers/handleOtp");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.patch(
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

router.patch(
  "/change",
  authenticate,
  PassWordvalidationRule(),
  ForgotPasswordvalidate,
  passwordcontroller.changePassword
);

module.exports = router;
