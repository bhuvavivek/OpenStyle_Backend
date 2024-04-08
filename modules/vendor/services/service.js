const subcategoryservice = require("./subcategoryservice");
const ServiceModel = require("../models/service");
const vendorservice = require("./vendorservice");
const VendorServiceModel = require("../models/vendorService");

class Service {
  async createService(serviceData) {
    try {
      const { serviceName, subCategoryId } = serviceData;

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

  async createVendorService(vendorId, serviceData) {
    try {
      const { serviceDuration, servicePrice, targetGender, serviceId } =
        serviceData;

      await vendorservice.getVendorById(vendorId);
      const service = await this.getServiceById(serviceId);

      if (!service) {
        const error = new Error("Invalid ServiceId");
        error.statusCode = 404;
        throw error;
      }

      const vendorService = new VendorServiceModel({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Service();
