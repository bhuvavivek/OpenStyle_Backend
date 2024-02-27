const { Router } = require("express");
const {
  serviceValidationRule,
  serviceValidator,
} = require("../../middlewares/valdiators/serviceValidator");
const createService = require("../../controllers/serviceController/createService");
const getAllService = require("../../controllers/serviceController/getAllService");

const router = Router();

router.post(
  "/create",
  serviceValidationRule(),
  serviceValidator,
  createService
);

router.get("/:subcategoryId", getAllService);

module.exports = router;
