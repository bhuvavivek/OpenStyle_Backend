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
          ...result.vendor.toObject(),
          walletBalance: result.vendorWallet.balance,
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
      const vendorId = req.user.id;
      const vendorData = req.body;

      if (req.type !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to update vendor details",
          success: false,
        });
      }

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
}

module.exports = new VendorController();
