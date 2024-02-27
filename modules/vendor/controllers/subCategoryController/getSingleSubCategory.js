const subcategoryservice = require("../../services/subcategoryservice");

const getSingleSubCategory = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const result = await subcategoryservice.getSubCategoryById(subcategoryId);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
