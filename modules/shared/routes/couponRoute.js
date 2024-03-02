const { Router } = require("express");
const CouponController = require("../controllers/couponControllers/couponController");
const {
  couponValidate,
  couponValidationRule,
} = require("../middleware/validator/couponvalidation");

const router = Router();

router.post(
  "/",
  couponValidationRule(),
  couponValidate,
  CouponController.createCoupon
);

router.get("/vendor/:id", CouponController.getCoupon);

router
  .route("/:id")
  .get(CouponController.getCouponById)
  .delete(CouponController.deleteCoupon);

module.exports = router;
