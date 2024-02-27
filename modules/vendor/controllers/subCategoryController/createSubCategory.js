const SubCategoryService = require("../../services/subcategoryservice");

const createSubCategory = async (req, res, next) => {
  try {
    const subCategoryData = req.body;

    const result = await SubCategoryService.createSubCategory(subCategoryData);

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

module.exports = createSubCategory;
