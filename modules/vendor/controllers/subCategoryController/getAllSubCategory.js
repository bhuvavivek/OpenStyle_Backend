const Category = require("../../models/category/category");
const SubCategory = require("../../models/subcategory/subcategory");
const subcategoryservice = require("../../services/subcategoryservice");

const getAllSubCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const result = await subcategoryservice.getSubCategoryByCategoryId(
      categoryId
    );

    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllSubCategory;
