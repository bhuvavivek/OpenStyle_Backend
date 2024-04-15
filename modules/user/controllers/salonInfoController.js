const salonInfoService = require("../services/salonInfoService");

class SalonInfoController {
  async getSalonInfo(req, res, next) {
    try {
      if (req.type !== "USER") {
        return res.status(400).json({ message: "User is not authorized " });
      }

      let salonInfos = await salonInfoService.getSalons(req.user.id);

      if (!salonInfos) {
        return res.status(200).json({ message: "No Salon Found", data: [] });
      }

      salonInfos = salonInfos.map((saloninfo) => formatSalonInfo(saloninfo));

      return res.status(200).json({ data: salonInfos });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SalonInfoController();

const formatSalonInfo = (salonInfo) => {
  return {
    id: salonInfo._id,
    shopName: salonInfo.shopName,
    emailAddress: salonInfo.emailAddress,
    phoneNumber: salonInfo.phoneNumber,
    shopType: salonInfo.shopType,
    shopAddress: salonInfo.shopAddress,
    shopImages: salonInfo.images,
    lattitude: salonInfo.lattitude,
    longitude: salonInfo.longitude,
    openTime: salonInfo.openTime,
    closeTime: salonInfo.closeTime,
    shopIsOpen: salonInfo.shopIsOpen,
    isFav: salonInfo.isFavourite,
    offer: "",
    distance: "",
  };
};
