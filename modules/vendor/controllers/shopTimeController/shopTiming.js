const shoptimeService = require("../../services/shoptimeService");
const moment = require("moment");
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

      // Validate opentime and closetime for each day
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      for (let day of days) {
        if (shopTimingData[day]) {
          if (!moment(shopTimingData[day].opentime, "HH:mm").isValid()) {
            const error = new Error(
              `Invalid opentime format for ${day} format must be in HH:mm`
            );
            error.statusCode = 400;
            throw error;
          }

          if (!moment(shopTimingData[day].closetime, "HH:mm").isValid()) {
            const error = new Error(
              `Invalid closetime format for ${day} format must be in HH:mm`
            );
            error.statusCode = 400;
            throw error;
          }

          if (
            moment(shopTimingData[day].opentime, "HH:mm").isAfter(
              moment(shopTimingData[day].closetime, "HH:mm")
            )
          ) {
            const error = new Error(
              `opentime should be less than closetime for ${day}`
            );
            error.statusCode = 400;
            throw error;
          }
        }
      }

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
