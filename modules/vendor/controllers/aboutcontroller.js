const AboutService = require("../services/aboutService");

class AboutController {
  async createAndupdateAbout(req, res, next) {
    try {
      const vendorId = req.user.id;
      const result = await AboutService.createAndUpdateAbout(
        vendorId,
        req.body
      );

      return res
        .status(200)
        .json({ message: "About updated successfully", data: result });
    } catch (error) {
      next(error);
    }
  }
  async getAbout(req, res, next) {
    try {
      const vendorId = req.user.id;
      const result = await AboutService.getAbout(vendorId);

      return res
        .status(200)
        .json({ message: "Get successfully", data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AboutController();
