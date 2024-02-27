const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: { value: true, message: "Category name is required" },
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
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",

      required: { value: true, message: "VendorId is required" },
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = Category;
