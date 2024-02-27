const CategoryService = require("../../services/categoryservice");

const createCategory = async (req, res, next) => {
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

module.exports = createCategory;
