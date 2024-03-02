const couponService = require("../../services/couponService");

class CouponController {
  createCoupon = async (req, res, next) => {
    try {
      const couponData = req.body;

      const result = await couponService.createCoupon(couponData);
      if (!result) {
        const error = new Error("Coupon not created");
        error.statusCode = 400;
        throw error;
      }

      return res.status(201).json(result);
    } catch (error) {
      if (error.name) {
        const errors = error.message.split(",");
        res.status(400).json({ error: errors[0] });
      } else {
        next(error);
      }
    }
  };

  getCoupon = async (req, res, next) => {
    try {
      const vendorId = req.params.id;

      const result = await couponService.getCoupon(vendorId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getCouponById = async (req, res, next) => {
    try {
      const couponId = req.params.id;
      const result = await couponService.getCouponById(couponId);
      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };

  deleteCoupon = async (req, res, next) => {
    try {
      const couponId = req.params.id;
      const result = await couponService.deleteCoupon(couponId);
      return res.status(400).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CouponController();
