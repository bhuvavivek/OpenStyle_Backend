const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema(
  {
    subCategoryName: {
      type: String,
      required: { value: true, message: "SubCategory name is required" },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: { value: true, message: "CategoryId is required" },
    },
  },
  { timestamps: true }
);

const SubCategory = model("SubCategory", subCategorySchema);

module.exports = SubCategory;
