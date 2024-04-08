const About = require("../models/about");
const VendorService = require("./vendorservice");

class AboutService {
  async UpdateAbout(vendorId, AboutData) {
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

      let about;
      about = await About.findOne({ vendor: vendorId });

      if (!about) {
        about = await About.create({ vendor: vendorId });
      }

      return about;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AboutService();
