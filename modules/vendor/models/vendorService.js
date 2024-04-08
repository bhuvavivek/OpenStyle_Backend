const { model, Schema } = require("mongoose");

const vendorServiceSchema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    require: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    require: true,
  },
  serviceDuration: {
    type: Number,
    require: true,
  },
  servicePrice: {
    type: Number,
    require: true,
  },
  targetGender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Both"],
      message: "Target gender must be Male, Female, or Both",
    },
    default: "Both",
    required: { value: true, message: "Target gender is required" },
  },
});

const VendorServiceModel = model("VendorService", vendorServiceSchema);

module.exports = VendorServiceModel;
