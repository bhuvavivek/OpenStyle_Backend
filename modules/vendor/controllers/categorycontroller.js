const CategoryService = require("../services/categoryservice");

class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      const categoryData = req.body;

      const result = await CategoryService.createCategory(categoryData);

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

  getCategories = async (req, res, next) => {
    try {
      let vendorId;

      if (req.query.vendorId && req.type === "USER") {
        vendorId = req.query.vendorId;
      } else {
        vendorId = req.user.id;
      }
      const result = await CategoryService.getCategories(
        req.query.dropdown,
        req.user.id
      );

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      const result = await CategoryService.getCategoryById(categoryId);
      res.status(200).json({ message: "Category fetched", result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CategoryController();
