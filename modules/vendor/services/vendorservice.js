const { generateToken } = require("../../shared/services/authentication");
const Vendor = require("../models/vendor/vendor");

class vendorService {
  async getVendorById(vendorId) {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }
      return vendor;
    } catch (error) {
      // Don't create a new Error object, just re-throw the caught error
      throw error;
    }
  }

  async createVendor(vendorData) {
    try {
      const {
        shopName,
        emailAddress,
        phoneNumber,
        password,
        totalSeats,
        shopType,
        shopAddress,
        lattitude,
        longitude,
      } = vendorData;

      const existingVendor = await Vendor.findOne({
        $or: [{ emailAddress }, { phoneNumber }],
      });

      if (existingVendor) {
        const error = new Error("Vendor already exists");
        error.statusCode = 409; // 409 Conflict
        throw error;
      }

      const vendor = await Vendor.create({
        shopName,
        emailAddress,
        phoneNumber,
        password,
        totalSeats,
        shopType,
        shopAddress,
        lattitude,
        longitude,
      });

      const token = generateToken(vendor, "VENDOR");

      return {
        message: "Vendor created successfully",
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new vendorService();
