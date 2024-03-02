const Vendor = require("../models/vendor/vendor");
const imageService = require("../services/imageService");

class ImageController {
  async checkVendor(req, res, next) {
    try {
      const vendorId = req.params.id;
      if (!vendorId) {
        const error = new Error("Invalid input");
        error.statusCode = 400;
        throw error;
      }
      const checkvendor = await Vendor.findById(vendorId);
      if (!checkvendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async addshopImage(req, res, next) {
    try {
      const file = req.file;
      if (!file) {
        const error = new Error("Please upload a file");
        error.statusCode = 400;
        throw error;
      }
      const imageUrl = await imageService.uploadShopImage(
        req.params.id,
        file.path
      );
      res.status(200).json({
        status: true,
        message: "Image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      next(error);
    }
  }

  async getShopImages(req, res, next) {
    try {
      const images = await imageService.getShopImage(req.params.id);
      return res.status(200).json({ status: true, images });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ImageController();
