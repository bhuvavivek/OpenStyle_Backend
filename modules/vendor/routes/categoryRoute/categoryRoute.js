const { Router } = require("express");

const {
  categoryValidationRule,
  categoryValidator,
} = require("../../middlewares/valdiators/categoryValidator");
const CategoryController = require("../../controllers/categorycontroller");
const { authenticate } = require("../../../shared/middleware/authenticate");
const router = Router();

router.post(
  "/create",
  categoryValidationRule(),
  categoryValidator,
  CategoryController.createCategory
);

router.get("/", authenticate, CategoryController.getCategories);

router.get("/:categoryId", authenticate, CategoryController.getCategory);

module.exports = router;
