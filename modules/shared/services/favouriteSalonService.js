const Vendor = require("../../vendor/models/vendor");
const User = require("../../user/models/user");
const FavouriteSalon = require("../models/favouriteSalon");

class FavouriteSalonService {
  async addFavouriteSalon(vendorId, userId) {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const user = await User.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const favouriteSalon = new FavouriteSalon({
        user: userId,
        salon: vendorId,
      });

      await favouriteSalon.save();
      return favouriteSalon;
    } catch (error) {
      throw error;
    }
  }

  async removeFavouriteSalon(vendorId, userId) {
    try {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const user = await User.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const favouriteSalon = await FavouriteSalon.findOneAndDelete({
        salon: vendorId,
        user: userId,
      });
      return favouriteSalon;
    } catch (error) {
      throw error;
    }
  }

  async isFavoriteSalon(vendorId, userId) {
    const favoriteSalon = await FavouriteSalon.findOne({
      salon: vendorId,
      user: userId,
    });
    return !!favoriteSalon;
  }
}

module.exports = new FavouriteSalonService();
