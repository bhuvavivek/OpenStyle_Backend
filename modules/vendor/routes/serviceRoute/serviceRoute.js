const { Router } = require("express");
const {
  serviceValidationRule,
  serviceValidator,
} = require("../../middlewares/valdiators/serviceValidator");
const ServiceController = require("../../controllers/servicecontroller");
const { authenticate } = require("../../../shared/middleware/authenticate");
const router = Router();

router.post(
  "/",
  serviceValidationRule(),
  serviceValidator,
  ServiceController.createService
);

router.get("/sub/:subcategoryId", authenticate, ServiceController.getServices);
router.get("/:serviceId", authenticate, ServiceController.getService);
router.patch("/:serviceId", ServiceController.updateService);

module.exports = router;
