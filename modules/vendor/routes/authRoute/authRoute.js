const { Router } = require("express");
const {
  handleCreateVendor,
  handleSignin,
} = require("../../controllers/authContollers/authentication");
const {
  signupValidationRules,
  signupvalidate,
} = require("../../middlewares/signupValidator");
const { otpVerification } = require("../../../shared/middleware/verifyOtp");
const router = Router();

router.post(
  "/signup",
  signupValidationRules(),
  signupvalidate,
  otpVerification,
  handleCreateVendor
);

router.post("/signin", handleSignin);

module.exports = router;
