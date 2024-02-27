const categoryservice = require("../../services/categoryservice");

const getAllCategory = async (req, res, next) => {
  try {
    const vendorId = req.params.vendorId;

    const result = await categoryservice.getCategoryByVendoId(vendorId);

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategory;
