const { otpVerification } = require("../../shared/middleware/verifyOtp");

const { Router } = require("express");
const {
  signupValidationRules,
  signupvalidate,
} = require("../middleware/signupValidator");
const {
  handlecreateUser,
  handleSignin,
} = require("../controllers/authantication");
const {
  phoneValidationRules,
  phoneValidate,
} = require("../../shared/middleware/phoneValidation");

// create a router
const authRouter = Router();

authRouter.post(
  "/signup",
  signupValidationRules(),
  signupvalidate,
  otpVerification,
  handlecreateUser
);

authRouter.post("/signin", handleSignin);

module.exports = authRouter;
