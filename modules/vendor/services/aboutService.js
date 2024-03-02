const About = require("../models/about/about");
const VendorService = require("./vendorservice");

class AboutService {
  async createAndUpdateAbout(vendorId, AboutData) {
    try {
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }
      await VendorService.getVendorById(vendorId);

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const updatedAbout = await About.findOneAndUpdate(
        { vendor: vendorId },
        AboutData,
        options
      );

      return updatedAbout;
    } catch (error) {
      throw error;
    }
  }

  async getAbout(vendorId) {
    try {
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }
      await VendorService.getVendorById(vendorId);

      const about = await About.findOne({ vendor: vendorId });

      if (!about) {
        const error = new Error("About not found");
        error.statusCode = 404;
        throw error;
      }

      return about;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AboutService();
