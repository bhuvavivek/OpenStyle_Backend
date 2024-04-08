const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: { value: true, message: "Category name is required" },
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = Category;
