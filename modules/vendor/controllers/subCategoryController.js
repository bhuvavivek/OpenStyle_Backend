const SubCategoryService = require("../services/subcategoryservice");

class SubCategoryController {
  createSubCategory = async (req, res, next) => {
    try {
      const subCategoryData = req.body;

      const result = await SubCategoryService.createSubCategory(
        subCategoryData
      );

      res.status(201).json(result);
    } catch (error) {
      // mongoose validation
      if (error.name === "ValidationError") {
        const errors = error.message.split(",");
        res.status(400).json({ error: errors[0] });
      } else {
        next(error);
      }
    }
  };

  getSubcategories = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;

      const result = await SubCategoryService.getSubCategoryByCategoryId(
        categoryId
      );

      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  getSubcategory = async (req, res, next) => {
    try {
      const subcategoryId = req.params.subcategoryId;
      const result = await SubCategoryService.getSubCategoryById(subcategoryId);
      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SubCategoryController();
