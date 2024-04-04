const User = require("../../../user/models/user");
const AppointmentService = require("../../services/appointment");
const moment = require("moment");
const blockShopSlotModel = require("../../models/slotsAvaibility");

class AppointmentController {
  setSummery = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const jwtType = req.type;

      if (jwtType !== "USER") {
        return res.status(401).json({
          message: "You are not authorized to set summery for this appointment",
          success: false,
        });
      }

      if (!userId) {
        const error = new Error("User Id is required");
        error.statusCode = 400;
        throw error;
      }

      const user = await User.findById(userId);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      if (!req.body.vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }

      if (!req.body.appointmentDate) {
        const error = new Error("Appointment Date is required");
        error.statusCode = 400;
        throw error;
      }

      if (req.body.appointmentDate) {
        const appointmentDate = moment(req.body.appointmentDate, "YYYY-MM-DD");
        if (!appointmentDate.isValid()) {
          const error = new Error("Appointment Date is not valid");
          error.statusCode = 400;
          throw error;
        }
      }

      if (!req.body.serviceId || req.body.serviceId.length <= 0) {
        const error = new Error("Service Id is required");
        error.statusCode = 400;
        throw error;
      }
      // check for user wallet amount
      var walletAmount = 0;
      if (req.body.isWallet) {
        walletAmount = user.wallet;
        if (walletAmount <= 0) {
          return res
            .status(400)
            .json({ message: "Insufficient wallet balance", success: false });
        }
      }

      const result = await AppointmentService.setSummerySession(
        req.session,
        req.body,
        userId,
        walletAmount
      );

      if (result && result.success === false) {
        return res.status(400).json({ message: result.message, sucess: false });
      }

      if (result) {
        res
          .status(200)
          .json({ message: "Summery set successfully", sucess: true });
      } else {
        res.status(401).json({ message: "Summery not set", sucess: false });
      }
    } catch (error) {
      if (
        (error.statusCode =
          400 && error.message === "Coupon is not applicable for this order")
      ) {
        return res.status(400).json({ message: error.message, sucess: false });
      } else {
        next(error);
      }
    }
  };

  getSummery = async (req, res, next) => {
    try {
      const summery = await AppointmentService.getSummerySession(req.session);
      if (summery) {
        res
          .status(200)
          .json({ message: "Summery fetched successfully", summery });
      } else {
        res
          .status(401)
          .json({ message: "Summery not found", summery: null, sucess: false });
      }
    } catch (error) {
      {
        next(error);
      }
    }
  };

  destroySummery = async (req, res, next) => {
    try {
      const isDestroyed = await AppointmentService.destroySummerySession(
        req.session
      );
      if (isDestroyed) {
        res.clearCookie("connect.sid"); // 'connect.sid' is the default name of the session ID cookie
        res
          .status(200)
          .json({ message: "Summery destroyed successfully", sucess: true });
      } else {
        res
          .status(401)
          .json({ message: "Summery not destroyed", sucess: false });
      }
    } catch (error) {
      next(error);
    }
  };

  getShopSlotTime = async (req, res, next) => {
    try {
      const shopId = req.params.id;
      const slotDate = req.query.slotDate;

      if (!shopId) {
        const error = new Error("vendorId is required");
        error.statusCode = 400;
        throw error;
      }

      if (!slotDate) {
        const error = new Error("slotDate is required");
        error.statusCode = 400;
        throw error;
      }

      if (!moment(slotDate, "YYYY-MM-DD").isValid()) {
        const error = new Error(
          `Invalid slotDate format ${slotDate} must be format in YYYY-MM-DD`
        );
        error.statusCode = 400;
        throw error;
      }

      const formatedSlotDate = moment(slotDate, "YYYY-MM-DD");
      const result = await AppointmentService.getShopSlotTime(
        shopId,
        formatedSlotDate
      );

      if (!result || result.length === 0) {
        return res.status(400).json({
          message: "Shop time not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Shop time fetched successfully",
        data: result,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  createAppointment = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  getAppointment = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  cancelAppointment = async (req, res, next) => {};

  reschedualAppointment = async (req, res, next) => {};

  completeAppointment = async (req, res, next) => {};

  blockShopSlot = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const jwtType = req.type;

      if (jwtType !== "USER") {
        return res.status(401).json({
          message: "You are not authorized to block shop slot",
          success: false,
        });
      }
      if (!userId) {
        const error = new Error("User Id is required");
        error.statusCode = 400;
        throw error;
      }

      if (!req.body.vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }

      if (!req.body.slotDate) {
        const error = new Error("slotDate is required");
        error.statusCode = 400;
        throw error;
      }

      if (!req.body.slotTime) {
        const error = new Error("slotTime is required");
        error.statusCode = 400;
        throw error;
      }

      // check for valida slotDate and valid Slote time formate

      if (!moment(req.body.slotDate, "YYYY-MM-DD").isValid()) {
        const error = new Error("Invalid slotDate format");
        error.statusCode = 400;
        throw error;
      }

      if (!moment(req.body.slotTime, "HH:mm").isValid()) {
        const error = new Error("Invalid slotTime format");
        error.statusCode = 400;
        throw error;
      }

      const result = await AppointmentService.blockshopSlot(
        req.body.vendorId,
        req.body.slotDate,
        req.body.slotTime,
        userId
      );

      if (result) {
        res.status(200).json({
          message: "Shop slot blocked successfully",
          success: true,
        });
      } else {
        res.status(401).json({
          message: "Shop slot not blocked",
          success: false,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  getblockShopSlpt = async (req, res, next) => {
    try {
      if (req.type !== "VENDOR") {
        const error = new Error("You are not authorixed to get the ShopSlot");
        error.statusCode(401);
        throw error;
      }

      const result = await blockShopSlotModel.find({ vendorId: req.user.id });
      return res.status(200).json({ result: result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AppointmentController();
