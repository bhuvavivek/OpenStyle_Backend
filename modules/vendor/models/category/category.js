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

/**
 * 
 * 
targetGender: {
  type: String,
  enum: {
    values: ["Male", "Female", "Both"],
    message: "Target gender must be Male, Female, or Both",
  },
  default: "Both",
  required: { value: true, message: "Target gender is required" },
},


 */
