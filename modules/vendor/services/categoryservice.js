const Category = require("../models/category/category");
const VendorService = require("./vendorservice");

class CategoryService {
  async createCategory(categoryData) {
    try {
      const { categoryName, targetGender, vendorId } = categoryData;

      // This will throw an error if the vendor is not found
      await VendorService.getVendorById(vendorId);

      const category = new Category({
        categoryName,
        targetGender,
        vendor: vendorId,
      });

      await category.validate();
      await category.save();

      return { message: "Category Created Successfully", category };
    } catch (error) {
      throw error;
    }
  }

  async getCategoryByVendoId(vendorId) {
    try {
      await VendorService.getVendorById(vendorId);
      const categories = await Category.find({ vendor: vendorId });

      if (!categories) {
        const error = new Error("Category not found ");
        error.statusCode = 404;
        throw error;
      }

      if (categories.length === 0) {
        return { message: "No categories found for this vendor" };
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
