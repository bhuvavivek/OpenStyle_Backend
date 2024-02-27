const categoryservice = require("../../services/categoryservice");

const getSingleCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await categoryservice.getCategoryById(categoryId);
    res.status(200).json({ message: "Category fetched", result });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleCategory;
