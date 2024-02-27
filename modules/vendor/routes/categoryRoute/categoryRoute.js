const { Router } = require("express");
const createCategory = require("../../controllers/categoryController/createCategory");
const {
  categoryValidationRule,
  categoryValidator,
} = require("../../middlewares/valdiators/categoryValidator");
const getAllCategory = require("../../controllers/categoryController/getAllCategory");
const getSingleCategory = require("../../controllers/categoryController/getSingleCategory");

const router = Router();

router.post(
  "/create",
  categoryValidationRule(),
  categoryValidator,
  createCategory
);

router.get("/:vendorId", getAllCategory);

router.get("/:categoryId", getSingleCategory);

module.exports = router;
