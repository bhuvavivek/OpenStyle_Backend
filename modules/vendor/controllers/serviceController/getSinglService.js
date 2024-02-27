const service = require("../../services/service");

const getSingleService = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId;
    const result = await service.getServiceById(serviceId);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleService;
