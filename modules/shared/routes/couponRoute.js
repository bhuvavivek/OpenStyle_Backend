const { Router } = require("express");
const CouponController = require("../controllers/couponControllers/couponController");
const {
  couponValidate,
  couponValidationRule,
} = require("../middleware/validator/couponValidation");
const { authenticate } = require("../middleware/authenticate");

const router = Router();

router.use(authenticate);

router.post(
  "/",
  couponValidationRule(),
  couponValidate,
  CouponController.createCoupon
);

router.get("/", CouponController.getCoupon);

router
  .route("/:id")
  .get(CouponController.getCouponById)
  .delete(CouponController.deleteCoupon);

module.exports = router;
