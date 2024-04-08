const { Router } = require("express");
const {
  serviceValidationRule,
  serviceValidator,
} = require("../../middlewares/valdiators/serviceValidator");
const ServiceController = require("../../controllers/servicecontroller");
const { authenticate } = require("../../../shared/middleware/authenticate");
const {
  vendorServiceValidationRule,
  vendorServiceValidator,
} = require("../../middlewares/valdiators/vendorServicevalidator");

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
router.post(
  "/vendorservice",
  authenticate,
  vendorServiceValidationRule(),
  vendorServiceValidator,
  ServiceController.createVendorService
);

module.exports = router;
