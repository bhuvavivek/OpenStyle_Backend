const subcategoryservice = require("./subcategoryservice");
const ServiceModel = require("../models/service");

class Service {
  async createService(serviceData) {
    try {
      const { serviceName, serviceDuration, servicePrice, subCategoryId } =
        serviceData;

      await subcategoryservice.getSubCategoryById(subCategoryId);

      const duplicateServiceName = await ServiceModel.findOne({
        serviceName,
        subCategory: subCategoryId,
      });

      if (duplicateServiceName) {
        const error = new Error("Service already exists");
        error.statusCode = 409;
        throw error;
      }

      const service = new ServiceModel({
        serviceName,
        serviceDuration,
        servicePrice,
        subCategory: subCategoryId,
      });

      await service.validate();
      await service.save();
      return { message: "Service  Created Sucessfully", service };
    } catch (error) {
      throw error;
    }
  }

  async getAllServiceBySubCategoryId(subcategoryId) {
    try {
      await subcategoryservice.getSubCategoryById(subcategoryId);
      const services = await ServiceModel.find({
        subCategory: subcategoryId,
      });

      if (!services) {
        const error = new Error("No Service Found");
        error.statusCode = 404;
        throw error;
      }

      if (services.length === 0) {
        return { message: "No Service found for this SubCategory" };
      }

      return services;
    } catch (error) {
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const service = await ServiceModel.findById(serviceId);

      if (!service) {
        const error = new Error("Invalid Service");
        error.statusCode = 404;
        throw error;
      }

      return service;
    } catch (error) {
      throw error;
    }
  }

  async updateServiceById(serviceName, serviceId) {
    try {
      const service = await ServiceModel.findById(serviceId);
      if (!service) {
        const error = new Error("Invalid ServiceId");
        error.statusCode = 404;
        throw error;
      }

      service.serviceName = serviceName;
      await service.save();
      return { message: "Service Updated Successfully", service };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Service();
