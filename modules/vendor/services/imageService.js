const Vendor = require("../models/vendor/vendor");

class imageService {
  async uploadShopImage(vendorId, imageUrl) {
    try {
      if (!vendorId || !imageUrl) {
        const error = new Error("Invalid input");
        error.statusCode = 400;
        throw error;
      }
      await Vendor.updateOne(
        { _id: vendorId },
        { $push: { images: imageUrl } }
      );

      return imageUrl;
    } catch (error) {
      throw error;
    }
  }

  async getShopImage(vendorId) {
    try {
      if (!vendorId) {
        const error = new Error("Invalid input");
        error.statusCode = 400;
        throw error;
      }
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }
      return vendor.images;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new imageService();
