const Vendor = require("../../vendor/models/vendor");
const moment = require("moment");
const ShopTiming = require("../../vendor/models/shoptiming");

class SalonInfo {
  async getSalons() {
    try {
      const salons = await Vendor.find({});

      if (!salons) {
        const error = new Error("Salons not found");
        error.statusCode = 404;
        throw error;
      }

      //   getting a current day using a moment
      const currentDay = moment().format("ddd").toLowerCase();

      //  add a filed shop is open or close based on the current day for perticular salon
      await Promise.all(
        salons.map(async (salon) => {
          const salonShopTiming = await ShopTiming.findOne({
            vendor: salon._id,
          });
          if (!salonShopTiming) {
            const error = new Error("Shop timing not found");
            error.statusCode = 404;
            throw error;
          }
          salon.shopIsOpen = salonShopTiming[currentDay].shopisOpen;
        })
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SalonInfo();
