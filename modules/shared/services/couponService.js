const vendorservice = require("../../vendor/services/vendorservice");
const Coupon = require("../models/coupon/coupon");
const generateCoupenCode = require("../utils/coupenCodeGenerator");

class CouponService {
  async createCoupon(couponData, vendorId) {
    try {
      const {
        coupenName,
        coupenType,
        minApplciableOrderPrice,
        maxDiscountPrice,
        discountPercentage,
        expireDate,
      } = couponData;

      const coupenCode = generateCoupenCode();

      await vendorservice.getVendorById(vendorId);

      if (expireDate <= new Date()) {
        const error = new Error("Expiration date must be a future date.");
        error.statusCode = 400; // Setting status code
        throw error;
      }

      const coupon = await Coupon.create({
        coupenName,
        coupenCode,
        coupenType,
        minApplciableOrderPrice,
        maxDiscountPrice,
        discountPercentage,
        expireDate,
        vendor: vendorId,
      });

      var formatedDate = coupon.expireDate.toISOString().split("T")[0];
      return {
        message: "Coupon Created Sucessfully",
        coupon: {
          ...coupon.toObject(),
          expireDate: formatedDate,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getCoupon(vendorId) {
    try {
      await vendorservice.getVendorById(vendorId);
      const coupons = await Coupon.find({ vendor: vendorId, isExpired: false });

      if (!coupons) {
        return { message: "Coupon Not Found " };
      }

      if (coupons.length === 0) {
        return { message: "no coupon found for this vendor" };
      }

      return { message: "fetch Coupen Sucessfully", coupon: coupons };
    } catch (error) {
      throw error;
    }
  }

  async getCouponById(couponId) {
    try {
      const coupon = await Coupon.findById(couponId);

      if (!coupon) {
        const error = new Error("Invalid Coupon Id");
        error.statusCode = 404;
        throw error;
      }

      return { message: "fetch Coupon Sucessfully", coupon };
    } catch (error) {
      throw error;
    }
  }

  async deleteCoupon(couponId) {
    try {
      const coupon = await Coupon.findById(couponId);

      if (!coupon) {
        const error = new Error("Coupon not found");
        error.statusCode = 404;
        throw error;
      }

      if (coupon.isExpired === true) {
        const error = new Error("Coupon already expired");
        error.statusCode = 400;
        throw error;
      }

      coupon.isExpired = true;
      await coupon.save();

      return { message: "Coupon deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new CouponService();
