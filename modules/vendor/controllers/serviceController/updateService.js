const service = require("../../services/service");

const updateService = async (req, res, next) => {
  try {
    const serviceData = req.body;
    const serviceId = req.params.serviceId;

    const result = await service.updateServiceById(serviceData, serviceId);

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = updateService;
