const BankAccountService = require("../../services/bankAccountservice");

class BankAccountController {
  async createBankAccount(req, res, next) {
    try {
      const result = await BankAccountService.createBankAccount(
        req.body,
        req.user.id
      );
      res.status(201).json(result);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = error.message.split(",");
        res.status(400).json({ error: errors[0] });
      }
      next(error);
    }
  }

  async getBankAccount(req, res, next) {
    try {
      if (req.type !== "VENDOR") {
        const error = new Error(
          "You are not authorized to perform this action"
        );
        error.statusCode = 403;
        throw error;
      }
      const bankAccount = await BankAccountService.getBankAccount(req.user.id);

      if (!bankAccount) {
        return res
          .status(200)
          .json({ message: "No Bank Account Found", data: {}, status: false });
      }

      res.status(200).json({
        result: {
          message: "Bank Account Found",
          data: bankAccount,
          status: true,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBankAccount(req, res, next) {
    try {
      if (req.type !== "VENDOR") {
        const error = new Error(
          "You are not authorized to perform this action"
        );
        error.statusCode = 403;
        throw error;
      }
      const result = await BankAccountService.updateBankAccount(
        req.user.id,
        req.body
      );
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BankAccountController();
