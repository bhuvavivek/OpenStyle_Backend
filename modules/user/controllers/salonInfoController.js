const { formatSalonInfo } = require("../../../utils/salonInfoFormat");
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
