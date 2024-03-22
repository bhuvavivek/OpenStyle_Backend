const shoptimeService = require("../../services/shoptimeService");

class ShopTimeController {
  getShopTiming = async (req, res, next) => {
    try {
      const vendorId = req.params.id;
      const result = await shoptimeService.getShopTime(vendorId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  updateShopTiming = async (req, res, next) => {
    try {
      const vendorId = req.params.id;
      const shopTimingData = req.body;
      const result = await shoptimeService.updateShopTime(
        vendorId,
        shopTimingData
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShopTimeController();
