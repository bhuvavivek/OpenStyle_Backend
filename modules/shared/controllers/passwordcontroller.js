const PasswordService = require("../services/password");

class PasswordController {
  async forgotPassword(req, res, next) {
    try {
      const result = await PasswordService.forgotPassword(req.body);
      return res
        .status(200)
        .json({ status: true, message: "Password Updated Successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PasswordController();