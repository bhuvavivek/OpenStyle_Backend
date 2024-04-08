const Service = require("../services/service");

class ServiceController {
  createService = async (req, res, next) => {
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

  getServices = async (req, res, next) => {
    try {
      const subcategoryId = req.params.subcategoryId;
      const result = await Service.getAllServiceBySubCategoryId(
        subcategoryId,
        req.query.dropdown,
        req.user.id
      );

      if (result.length === 0) {
        return res.status(200).json({
          message: "No Service found for this SubCategory",
          result: [],
        });
      }

      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  getService = async (req, res, next) => {
    try {
      const serviceId = req.params.serviceId;
      const result = await Service.getServiceById(serviceId);
      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  updateService = async (req, res, next) => {
    try {
      const { serviceName } = req.body;
      const serviceId = req.params.serviceId;

      const result = await Service.updateServiceById(serviceName, serviceId);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  createVendorService = async (req, res, next) => {
    try {
      const vendorId = req.user.id;
      const serviceData = req.body;

      if (req.type !== "VENDOR") {
        const error = new Error("You are not authorized to create service");
        error.statusCode = 401;
        throw error;
      }

      const result = await Service.createVendorService(vendorId, serviceData);
      return res
        .status(201)
        .json({ message: "Service created successfully", result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ServiceController();
