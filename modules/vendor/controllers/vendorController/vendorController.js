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

      const sliderImages = [
        "https://media.istockphoto.com/id/1481299284/photo/asian-backpacker-on-mountain-peak-and-using-binoculars-looking-forward.jpg?s=1024x1024&w=is&k=20&c=JqwRK2QEaY9w8SBO0z3xrsZExJFLmzbU0wQbEJOg_PA=",
        "https://media.istockphoto.com/id/873289826/photo/successful-young-woman-backpacker-jumping-on-cliffs-edge.jpg?s=1024x1024&w=is&k=20&c=jBA8mG0guXeU-nzyhT_XoLmnbcsT-CIzo9hDkT1rSyk=",
        "https://media.istockphoto.com/id/487076033/photo/4k-television-display.jpg?s=2048x2048&w=is&k=20&c=l3K0tAFMjxWx7T5dReY2RSS8dX8ZvREMjTrJDQsgTyc=",
      ];
      return res.status(200).json({
        result: {
          ...result.vendor.toObject(),
          walletBalance: result.vendorWallet?.balance,
          password: undefined,
          salt: undefined,
        },
        sliderImages,
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
          ...result.updatedVendor.toObject(),
          walletBalance: result.vendorWallet?.balance,
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
