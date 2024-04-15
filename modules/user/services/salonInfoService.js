const Vendor = require("../../vendor/models/vendor");
const moment = require("moment");
const ShopTiming = require("../../vendor/models/shoptiming");
const favouriteSalonService = require("../../shared/services/favouriteSalonService");

class SalonInfoService {
  async getSalons(userId) {
    try {
      let salons = await Vendor.find({}).select("-password -salt -__v");

      if (!salons) {
        const error = new Error("Salons not found");
        error.statusCode = 404;
        throw error;
      }

      //  add a field for shop is open or close based on the current day for perticular salon
      salons = await Promise.all(
        salons.map(async (salon) => checkShopOpenOrClose(salon))
      );

      //  add a favourite Salon if it is favourite
      salons = await Promise.all(
        salons.map(async (salon) => {
          salon.isFavourite = await favouriteSalonService.isFavoriteSalon(
            salon._id,
            userId
          );
          return salon;
        })
      );

      return salons;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SalonInfoService();

// helper functions

// check if shop is open or close
const checkShopOpenOrClose = async (salon) => {
  //   getting a current day using a moment
  const currentDay = moment().format("dddd").toLowerCase();
  try {
    const salonShopTiming = await ShopTiming.findOne({
      vendor: salon._id,
    });
    salon = salon.toObject();
    if (salonShopTiming) {
      salon.openTime = salonShopTiming[currentDay]?.opentime;
      salon.closeTime = salonShopTiming[currentDay]?.closetime;
      //   checking if shop is open or close
      if (
        moment().isBetween(
          moment(salon.openTime, "hh:mm A"),
          moment(salon.closeTime, "hh:mm A")
        ) &&
        salonShopTiming[currentDay]?.shopisOpen === true
      ) {
        salon.shopIsOpen = true;
      } else {
        salon.shopIsOpen = false;
      }
    }
    if (!salonShopTiming) {
      salon.openTime = "12:00 AM";
      salon.closeTime = "12:00 AM";
      salon.shopIsOpen = false;
    }
    return salon;
  } catch (error) {
    throw error;
  }
};
