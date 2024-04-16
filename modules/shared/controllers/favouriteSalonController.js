const { formatSalonInfo } = require("../../../utils/salonInfoFormat");
const salonInfoService = require("../../user/services/salonInfoService");
const FavouriteSalonService = require("../services/favouriteSalonService");

class FavouriteSalonController {
  async addFavouriteSalon(req, res, next) {
    try {
      if (req.type !== "USER") {
        return res.status(400).json({ message: "User is not authorized" });
      }
      if (!req.body.vendorId) {
        return res.status(400).json({ message: "Vendor id is required" });
      }
      const favouriteSalon = await FavouriteSalonService.addFavouriteSalon(
        req.body.vendorId,
        req.user.id
      );

      return res.status(200).json({ message: "Salon is added to favourite" });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Salon already added to favourite" });
      } else {
        next(error);
      }
    }
  }

  async removeFavouriteSalon(req, res, next) {
    try {
      if (req.type !== "USER") {
        return res.status(400).json({ message: "User is not authorized" });
      }

      if (!req.query.vendorId) {
        return res.status(400).json({ message: "Vendor id is required" });
      }
      const favouriteSalon = await FavouriteSalonService.removeFavouriteSalon(
        req.query.vendorId,
        req.user.id
      );

      if (!favouriteSalon) {
        return res
          .status(400)
          .json({ message: "This Salon is not a favorite for this user" });
      }

      return res
        .status(200)
        .json({ message: "Salon is removed from favourite" });
    } catch (error) {
      next(error);
    }
  }

  async getFavouriteSalon(req, res, next) {
    try {
      if (req.type !== "USER") {
        return res.status(400).json({ message: "User is not authorized " });
      }

      let favSalonInfos = await salonInfoService.getSalons(req.user.id);

      if (!favSalonInfos) {
        return res.status(200).json({ message: "Salon Not Found", data: [] });
      }

      favSalonInfos = favSalonInfos.map((favsalon) =>
        formatSalonInfo(favsalon)
      );

      // filter the salon which is favourite
      favSalonInfos = favSalonInfos.filter((salon) => salon.isFav === true);

      if (!favSalonInfos) {
        return res
          .status(200)
          .json({ message: "Salon Not Added To Fav", data: [] });
      }

      return res.status(200).json({ data: favSalonInfos });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FavouriteSalonController();
