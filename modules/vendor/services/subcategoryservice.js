const categoryservice = require("./categoryservice");

const SubCategory = require("../models/subcategory/subcategory");

class SubCategoryService {
  async createSubCategory(subCategoryData) {
    try {
      const { subCategoryName, categoryId } = subCategoryData;

      await categoryservice.getCategoryById(categoryId);

      const subCategory = new SubCategory({
        subCategoryName,
        category: categoryId,
      });

      await subCategory.validate();
      await subCategory.save();

      return { message: "SubCategory Created Successfully", subCategory };
    } catch (error) {
      throw error;
    }
  }

  async getSubCategoryByCategoryId(categoryId) {
    try {
      await categoryservice.getCategoryById(categoryId);
      const subcategories = await SubCategory.find({ category: categoryId });

      if (!subcategories) {
        const error = new Error("No SubCategory Found");
        error.statusCode = 404;
        throw error;
      }

      if (subcategories.length === 0) {
        return { message: "No SubCategory found for this Category" };
      }

      return subcategories;
    } catch (error) {
      throw error;
    }
  }

  async getSubCategoryById(subCategoryId) {
    try {
      const subCategory = await SubCategory.findById(subCategoryId);

      if (!subCategory) {
        const error = new Error("SubCategory Not Found");
        error.statusCode = 404;
        throw error;
      }

      return subCategory;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SubCategoryService();
