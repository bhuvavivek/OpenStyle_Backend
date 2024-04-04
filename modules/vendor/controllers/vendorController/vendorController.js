const vendorservice = require("../../services/vendorservice");

class VendorController {
  getvendor = async (req, res, next) => {
    try {
      const vendorId = req.user.id;
      const authType = req.type;
      if (authType !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to get vendor details",
          success: false,
        });
      }
      const result = await vendorservice.getVendorById(vendorId);
      return res.status(200).json({
        result: {
          ...result.toObject(),
          password: undefined,
          salt: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  updateVendor = async (req, res, next) => {
    try {
      const vendorId = req.params.id;
      const vendorData = req.body;

      const result = await vendorservice.updateVendor(vendorId, vendorData);
      return res.status(200).json({
        result: {
          ...result.toObject(),
          password: undefined,
          salt: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const result = await vendorservice.changePassword(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new VendorController();
