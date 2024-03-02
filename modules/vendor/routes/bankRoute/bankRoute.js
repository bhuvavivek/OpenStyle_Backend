const { Router } = require("express");
const bankAccountController = require("../../controllers/bankAccount/bankAccountController");
const {
  bankValidationRule,
} = require("../../middlewares/valdiators/bankValidator");
const {
  vendorValidate,
} = require("../../middlewares/valdiators/vendorValidatior");

const router = Router();

router
  .route("/:id")
  .get(bankAccountController.getBankAccount)
  .put(
    bankValidationRule(),
    vendorValidate,
    bankAccountController.updateBankAccount
  );

module.exports = router;
