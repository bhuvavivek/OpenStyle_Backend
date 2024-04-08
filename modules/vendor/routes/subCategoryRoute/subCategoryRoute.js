const { Router } = require("express");
const {
  subCategoryValidationRule,
  subCategoryValidator,
} = require("../../middlewares/valdiators/subCategoryValidator");

const SubCategoryController = require("../../controllers/subCategoryController");
const { authenticate } = require("../../../shared/middleware/authenticate");

const router = Router();

router.post(
  "/",
  subCategoryValidationRule(),
  subCategoryValidator,
  SubCategoryController.createSubCategory
);

router.get(
  "/:categoryId",
  authenticate,
  SubCategoryController.getSubcategories
);
router.get(
  "/sub/:subcategoryId",
  authenticate,
  SubCategoryController.getSubcategory
);
module.exports = router;
