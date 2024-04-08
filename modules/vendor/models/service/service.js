const { Schema, model } = require("mongoose");

const serviceSchema = {
  serviceName: {
    type: String,
    required: { value: true, message: "Service name is required" },
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: { value: true, message: "SubCategory Id is required" },
  },
};

const Service = model("Service", serviceSchema);

module.exports = Service;
