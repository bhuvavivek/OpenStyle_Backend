const { TimeFormat } = require("../../../../utils");
const shoptimeService = require("../../services/shoptimeService");
const moment = require("moment");
class ShopTimeController {
  getShopTiming = async (req, res, next) => {
    try {
      const vendorId = req.user.id;

      const authType = req.type;

      if (authType !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to Get ShopTime Details",
          success: false,
        });
      }

      const result = await shoptimeService.getShopTime(vendorId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  updateShopTiming = async (req, res, next) => {
    try {
      const vendorId = req.user.id;

      const authType = req.type;

      if (authType !== "VENDOR") {
        return res.status(401).json({
          message: "You are not authorized to Update ShopTime Details",
          success: false,
        });
      }
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

      // validate the providing time is valid 12 hour format time or not  for each day
      days.forEach((day) => {
        if (shopTimingData[day]) {
          if (!TimeFormat.Validate12Hour(shopTimingData[day].opentime)) {
            const error = new Error(
              `Invalid opentime format for ${day} format must be in 12 Hour Format`
            );
            error.statusCode = 400;
            throw error;
          }

          if (!TimeFormat.Validate12Hour(shopTimingData[day].closetime)) {
            const error = new Error(
              `Invalid closetime format for ${day} format must be in 12 Hour Format`
            );
            error.statusCode = 400;
            throw error;
          }

          if (
            shopTimingData[day].closetime !== "12:00 AM" &&
            moment(shopTimingData[day].opentime, "hh:mm A").isAfter(
              moment(shopTimingData[day].closetime, "hh:mm A")
            )
          ) {
            const error = new Error(
              `opentime should be less than closetime for ${day}`
            );
            error.statusCode = 400;
            throw error;
          }
        }
      });

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
