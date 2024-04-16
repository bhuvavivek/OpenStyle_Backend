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

      const sliderImages = [
        "https://media.istockphoto.com/id/1481299284/photo/asian-backpacker-on-mountain-peak-and-using-binoculars-looking-forward.jpg?s=1024x1024&w=is&k=20&c=JqwRK2QEaY9w8SBO0z3xrsZExJFLmzbU0wQbEJOg_PA=",
        "https://media.istockphoto.com/id/873289826/photo/successful-young-woman-backpacker-jumping-on-cliffs-edge.jpg?s=1024x1024&w=is&k=20&c=jBA8mG0guXeU-nzyhT_XoLmnbcsT-CIzo9hDkT1rSyk=",
        "https://media.istockphoto.com/id/487076033/photo/4k-television-display.jpg?s=2048x2048&w=is&k=20&c=l3K0tAFMjxWx7T5dReY2RSS8dX8ZvREMjTrJDQsgTyc=",
      ];

      return res.status(200).json({ data: salonInfos, sliderImages });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SalonInfoController();
