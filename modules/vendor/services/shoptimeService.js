const Shoptiming = require("../models/shoptiming/shoptiming");

class ShopTimeService {
  async updateShopTime(vendorId, shopTimeData) {
    try {
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }

      if (Object.keys(shopTimeData).length === 0) {
        const error = new Error("At least one field is required");
        error.statusCode = 400;
        throw error;
      }

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const updatedTime = await Shoptiming.findOneAndUpdate(
        { vendor: vendorId },
        shopTimeData,
        options
      );

      return { message: "Shop Time Updated SucessFully", data: updatedTime };
    } catch (error) {
      throw error;
    }
  }

  async getShopTime(vendorId) {
    try {
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }

      let shopTime = await Shoptiming.findOne({ vendor: vendorId });

      if (!shopTime) {
        const defaultDay = {
          opentime: "00:00",
          closetime: "00:00",
          shopisOpen: false,
        };

        shopTime = new Shoptiming({
          vendor: vendorId,
          sunday: defaultDay,
          monday: defaultDay,
          tuesday: defaultDay,
          wednesday: defaultDay,
          thursday: defaultDay,
          friday: defaultDay,
          saturday: defaultDay,
        });

        await shopTime.save();
      }
      return shopTime;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ShopTimeService();
