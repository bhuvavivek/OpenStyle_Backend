const service = require("../../services/service");

const getAllService = async (req, res, next) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const result = await service.getAllServiceBySubCategoryId(subcategoryId);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllService;
