const { Router } = require("express");
const {
  subCategoryValidationRule,
  subCategoryValidator,
} = require("../../middlewares/valdiators/subCategoryValidator");
const createSubCategory = require("../../controllers/subCategoryController/createSubCategory");
const getAllSubCategory = require("../../controllers/subCategoryController/getAllSubCategory");

const router = Router();

router.post(
  "/create",
  subCategoryValidationRule(),
  subCategoryValidator,
  createSubCategory
);

router.get("/:categoryId", getAllSubCategory);
module.exports = router;
