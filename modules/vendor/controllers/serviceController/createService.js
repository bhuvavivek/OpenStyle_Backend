const Service = require("../../services/service");
const createService = async (req, res, next) => {
  try {
    const serviceData = req.body;

    const result = await Service.createService(serviceData);

    return res.status(201).json({ result });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = error.message.split(",");
      res.status(400).json({ error: errors[0] });
    } else {
      next(error);
    }
  }
};

module.exports = createService;
