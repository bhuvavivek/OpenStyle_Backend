const {
  vendorServiceValidationRule,
} = require("../middlewares/valdiators/vendorServicevalidator");
const Category = require("../models/category");
const VendorServiceModel = require("../models/vendorService");
const VendorService = require("./vendorservice");

class CategoryService {
  async createCategory(categoryData) {
    try {
      const { categoryName } = categoryData;

      const duplicateName = await Category.findOne({
        categoryName: categoryName,
      });

      if (duplicateName) {
        const error = new Error("Category already exists");
        error.statusCode = 409;
        throw error;
      }

      const category = new Category({
        categoryName,
      });

      await category.validate();
      await category.save();

      return { message: "Category Created Successfully", category };
    } catch (error) {
      throw error;
    }
  }

  async getCategories(dropdown, vendorId) {
    try {
      let categories;

      if (dropdown === "true") {
        categories = await Category.find({});
      }

      if (!dropdown || dropdown === "false") {
        categories = (
          await VendorServiceModel.find({
            vendorId: vendorId,
          })
            .populate({
              path: "categoryId",
            })
            .select("categoryId -_id")
        ).map((doc) => doc.categoryId);

        categories = categories.filter(
          (category, index, self) => self.indexOf(category) === index
        );
      }

      if (!categories) {
        const error = new Error("Category not found ");
        error.statusCode = 404;
        throw error;
      }

      if (categories.length === 0) {
        return { message: "No categories found" };
      }

      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        const error = new Error("Invalid Category Id");
        error.statusCode = 404;
        throw error;
      }
      return category;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();
