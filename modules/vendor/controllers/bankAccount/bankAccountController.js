const BankAccountService = require("../../services/bankAccountservice");

class BankAccountController {
  async createBankAccount(req, res, next) {
    try {
      const result = await BankAccountService.createBankAccount(req.body);

      res.status(201).json(result);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = error.message.split(",");
        res.status(400).json({ error: errors[0] });
        next(error);
      }
    }
  }

  async getBankAccount(req, res, next) {
    try {
      const bankAccount = await BankAccountService.getBankAccount(
        req.params.id
      );
      res
        .status(200)
        .json({ result: { message: "Bank Account Found", bankAccount } });
    } catch (error) {
      next(error);
    }
  }

  async updateBankAccount(req, res, next) {
    try {
      const result = await BankAccountService.updateBankAccount(
        req.params.id,
        req.body
      );
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BankAccountController();
