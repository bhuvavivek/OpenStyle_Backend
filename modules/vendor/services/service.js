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

  async getAllServiceBySubCategoryId(subcategoryId, dropdown, vendorId) {
    try {
      await subcategoryservice.getSubCategoryById(subcategoryId);
      let services;

      if (dropdown === "true") {
        services = await ServiceModel.find({
          subCategory: subcategoryId,
        });
      }

      if (!dropdown || dropdown === "false") {
        services = await VendorServiceModel.find({
          vendorId: vendorId,
          subCategoryId: subcategoryId,
        })
          .select("-_id -vendorId -categoryId -subCategoryId")
          .populate({
            path: "serviceId",
            select: "_id serviceName ",
          });

        // reformate the object and store to the services
        services = services.map((service) => {
          const { serviceId, ...otherProps } = service.toObject();
          return { ...serviceId, ...otherProps };
        });
      }

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

      const service = await ServiceModel.findById(serviceId).populate({
        path: "subCategory",
        populate: { path: "category" },
      });

      if (!service) {
        const error = new Error("Invalid ServiceId");
        error.statusCode = 404;
        throw error;
      }

      const vendorService = await VendorServiceModel.create({
        vendorId,
        serviceId,
        serviceDuration,
        servicePrice,
        targetGender,
        categoryId: service.subCategory.category._id,
        subCategoryId: service.subCategory._id,
      });

      return vendorService;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Service();
