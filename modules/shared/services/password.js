const Vendor = require("../../vendor/models/vendor/vendor");
const User = require("../../user/models/user");
const { createHmac } = require("node:crypto");

class PasswordService {
  async forgotPassword(entityBody) {
    try {
      const { phoneNumber, newPassword, userType } = entityBody;

      let Entity;

      if (userType === "Vendor") {
        Entity = Vendor;
      } else {
        Entity = User;
      }
      const entity = await Entity.findOne({ phoneNumber });

      if (!entity) {
        const error = new Error("Invalid PhoneNumber");
        error.statusCode = 404;
        throw error;
      }

      const newpasswordhash = createHmac("sha256", entity.salt)
        .update(newPassword)
        .digest("hex");

      if (entity.password === newpasswordhash) {
        const error = new Error(
          "New Password cannot be the same as old password"
        );
        error.statusCode = 400;
        throw error;
      }

      entity.password = newPassword;
      await entity.save();
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async checkpassword(vendorBody) {
    const { phoneNumber, newPassword, userType } = vendorBody;
  }
}

module.exports = new PasswordService();
