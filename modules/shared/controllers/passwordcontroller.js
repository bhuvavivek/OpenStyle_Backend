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

  async changePassword(req, res, next) {
    try {
      Object.keys(req.body).forEach((key) => {
        if (!["newPassword", "oldPassword", "entityType"].includes(key)) {
          const error = new Error(`Missing required field ${key}`);
          error.statusCode = 400;
          throw error;
        }
      });

      ["newPassword", "oldPassword", "entityType"].forEach((key) => {
        if (!req.body.hasOwnProperty(key) || req.body[key] === null) {
          const error = new Error(`Missing or null field ${key}`);
          error.statusCode = 400;
          throw error;
        }
      });
      const result = await PasswordService.changePassword({
        data: req.body,
        entityId: req.user.id,
        jwtType: req.type,
      });
      return res
        .status(200)
        .json({ status: true, message: "Password Changed Successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PasswordController();
