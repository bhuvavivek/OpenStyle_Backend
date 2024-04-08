const { Router } = require("express");
const bankAccountController = require("../../vendor/controllers/bankAccount/bankAccountController");
const {
  bankValidationRule,
  newBankValidationRule,
} = require("../../vendor/middlewares/valdiators/bankValidator");
const {
  vendorValidate,
} = require("../../vendor/middlewares/valdiators/vendorValidatior");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.use(authenticate);
router
  .route("/")
  .get(bankAccountController.getBankAccount)
  .post(
    newBankValidationRule(),
    vendorValidate,
    bankAccountController.createBankAccount
  )
  .put(
    bankValidationRule(),
    vendorValidate,
    bankAccountController.updateBankAccount
  );

module.exports = router;
