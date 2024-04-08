const { Router } = require("express");
const { generateAndSendOtp } = require("../controllers/handleOtp");
const {
  phoneValidationRules,
  phoneValidate,
} = require("../middleware/phoneValidation");
const { setFlag } = require("../utils/setflag");

const router = Router();

router.post(
  "/sendotp",
  phoneValidationRules(),
  phoneValidate,
  setFlag(),
  generateAndSendOtp
);

module.exports = router;
