const AboutService = require("../services/aboutService");

class AboutController {
  async UpdateAbout(req, res, next) {
    try {
      const vendorId = req.user.id;
      const authType = req.type;

      if (authType !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to Update About Details",
          success: false,
        });
      }
      const result = await AboutService.UpdateAbout(vendorId, req.body);

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

      const authType = req.type;
      if (authType !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to get About Details",
          success: false,
        });
      }

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
