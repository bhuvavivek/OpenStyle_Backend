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

  async changePassword({ data, jwtType, entityId }) {
    try {
      const { newPassword, oldPassword, entityType } = data;
      let Entity;

      if (
        entityType !==
        jwtType.charAt(0).toUpperCase() + jwtType.slice(1).toLowerCase()
      ) {
        const error = new Error(
          `Please Send Valid Entity Type , Sending Entity type for ${jwtType} is not valid ${entityType}`
        );
        throw error;
      }

      if (entityType === "Vendor") {
        Entity = Vendor;
      } else {
        Entity = User;
      }

      const entity = await Entity.findById(entityId);
      if (!entity) {
        const error = new Error("Entity Not Found");
        error.statusCode = 404;
        throw error;
      }

      const oldpasswordhash = createHmac("sha256", entity.salt)
        .update(oldPassword)
        .digest("hex");

      if (entity.password !== oldpasswordhash) {
        const error = new Error("Invalid Old Password");
        error.statusCode = 400;
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
}

module.exports = new PasswordService();
