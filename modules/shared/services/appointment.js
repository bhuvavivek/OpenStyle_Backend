const moment = require("moment");
const User = require("../../user/models/user");
const Service = require("../../vendor/models/service");

const Vendor = require("../../vendor/models/vendor");
const Appointment = require("../models/appointment/appointment");
const Coupon = require("../models/coupon/coupon");
const shopTimeService = require("../../vendor/services/shoptimeService");
const SlotsAvaibility = require("../models/slotsAvaibility");
const { TimeFormat } = require("../../../utils");

class AppointmentService {
  async setSummerySession(session, data, userId, walletAmount) {
    try {
      const { vendorId, serviceId, coupenId, appointmentDate, isWallet } = data;

      // check for user before process

      const user = await User.findById(userId);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // check for vendor Before process

      const vendorDetails = await Vendor.findById(vendorId);

      if (!vendorDetails) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      // write a code for session
      if (session && data) {
        // If session.summery doesn't exist, initialize it with an empty object
        if (!session.summery) {
          session.summery = {
            userId: null,
            vendorId: null,
            serviceId: [],
            coupenId: null,
            shopName: null,
            shopAddress: null,
            serviceAmounts: 0,
            coupenAmount: 0,
            subTotal: 0,
          };
        }

        // set userId
        session.summery.userId = userId;

        // set subtotal && plateform fee
        session.summery.subTotal = 0.0;
        session.summery.grandTotal = session.summery.subTotal;

        // for the wallet & Appointmentdate
        session.summery.appointmentDate = appointmentDate;
        session.summery.isWallet = isWallet ? isWallet : false;
        session.summery.usedWalletAmount = 0.0;

        // Merge the new data with the existing session.summery data
        if (vendorDetails) {
          session.summery.vendorId = vendorId;
          session.summery.shopName = vendorDetails.shopName;
          session.summery.shopAddress = vendorDetails.shopAddress;
        }

        // code for services and price calculations of service
        if (serviceId && serviceId.length > 0) {
          var serviceAmounts = 0.0;
          session.summery.serviceId = serviceId;
          const serviceDetails = await Promise.all(
            serviceId.map(async (serviceId) => {
              const service = await Service.findById(serviceId);
              return {
                serviceId: service._id,
                serviceName: service.serviceName,
                servicePrice: service.servicePrice,
              };
            })
          );
          // set the services details
          session.summery.serviceDetails = serviceDetails;

          serviceAmounts = serviceDetails.reduce(
            (acc, service) => acc + service.servicePrice,
            0
          );

          session.summery.serviceAmounts = serviceAmounts;
          // update subTotal
          session.summery.subTotal += serviceAmounts;
          // update grandTotal
          session.summery.grandTotal += session.summery.subTotal;
        } else {
          session.summery.serviceId = [];
          session.summery.serviceDetails = [];
          session.summery.serviceAmounts = 0.0;
        }

        // code for coupen and discount
        if (coupenId && serviceAmounts) {
          var coupenAmount = 0.0;
          session.summery.coupenId = coupenId;
          const coupen = await Coupon.findById(coupenId);
          // check the coupen has data or not
          if (coupen && !coupen.isExpired) {
            if (coupen.minApplciableOrderPrice <= serviceAmounts) {
              // If the coupon is applicable calculate the discountPrice
              const discountedPrice = Math.round(
                (serviceAmounts * coupen.discountPercentage) / 100.0
              );

              // check the discount price greater than maxdiscountPrice
              if (discountedPrice > coupen.maxDiscountPrice) {
                coupenAmount = coupen.maxDiscountPrice; //make coupenAmount to MaxDiscountprice
              } else {
                coupenAmount = discountedPrice; //make coupenAmount to discountedPrice
              }

              session.summery.coupenAmount = coupenAmount;
            } else {
              session.summery.coupenAmount = coupenAmount;
              return {
                success: false,
                message: "Coupon is not applicable for this order",
              };
            }
          } else {
            session.summery.coupenAmount = coupenAmount;
            return {
              success: false,
              message: "Coupon is expired",
            };
          }
          // update SubTotal
          session.summery.subTotal -= coupenAmount;
          // update grandTotal
          session.summery.grandTotal -= coupenAmount;
        } else {
          session.summery.coupenAmount = 0.0;
          session.summery.coupenId = null;
        }

        if (appointmentDate) {
          session.summery.appointmentDate = appointmentDate;
        }

        // for the wallet
        if (isWallet && walletAmount > 0) {
          if (walletAmount >= session.summery.subTotal) {
            session.summery.usedWalletAmount = session.summery.subTotal;
            session.summery.grandTotal -= session.summery.usedWalletAmount;
          } else {
            session.summery.usedWalletAmount = walletAmount;
            session.summery.grandTotal -= walletAmount;
          }
        }

        return session.summery;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async getSummerySession(session) {
    if (session && session.summery) {
      return session.summery;
    }
    return null;
  }

  async destroySummerySession(session) {
    try {
      if (session && session.summery) {
        await new Promise((resolve, reject) => {
          session.destroy((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        });
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async getShopSlotTime(shopId, slotDate) {
    try {
      const vendor = await Vendor.findById(shopId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }
      const shopTime = await shopTimeService.getShopTime(shopId);

      const dayOfWeek = moment(slotDate).format("dddd").toLowerCase();
      const openTime = moment(shopTime?.[dayOfWeek]?.opentime, "hh:mm A");
      const closeTime = moment(shopTime?.[dayOfWeek]?.closetime, "hh:mm A");
      const isshopOpen = shopTime?.[dayOfWeek]?.shopisOpen;

      if (!isshopOpen) {
        const error = new Error("Shop is closed");
        error.statusCode = 400;
        throw error;
      }

      if (shopTime?.[dayOfWeek]?.closetime === "12:00 AM") {
        closeTime.add(1, "days");
      }

      let timeSlots = [];

      for (
        let time = openTime;
        time.isBefore(closeTime);
        time.add(30, "minutes")
      ) {
        if (time.isBefore(openTime) || time.isAfter(closeTime)) {
          continue;
        }
        timeSlots.push({
          time: moment(time).format("hh:mm A"),
          isblocked: false,
        });
      }

      if (
        moment(slotDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ) {
        const currentTimePlusOneHour = moment().add(1, "hours");
        timeSlots = timeSlots.filter((slot) =>
          moment(slot.time, "hh:mm A").isSameOrAfter(currentTimePlusOneHour)
        );
      }
      // Refactor timeslots based on blocked status
      const filteredtimeSlots = await Promise.all(
        timeSlots.map(async (time) => {
          const blockslot = await SlotsAvaibility.findOne({
            $and: [
              { slotstartTime: time.time },
              { slotdate: moment(slotDate).format("YYYY-MM-DD") },
              { isBlocked: true },
              { vendorId: shopId },
            ],
          });

          if (
            blockslot &&
            blockslot.isBlocked &&
            blockslot.slotstartTime === time.time
          ) {
            // Update isblocked status
            time.isblocked = true;
          }

          return time;
        })
      );

      return filteredtimeSlots;
    } catch (error) {
      throw error;
    }
  }

  async createAppointment() {
    try {
      const { vendorId, userId, serviceId, coupenId, ...otherData } =
        appointmentData;

      const appointment = await Appointment.create({
        vendorId: vendorId,
        userId: userId,
        serviceId: serviceId,
        coupenId: coupenId,
        ...otherData,
      });

      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async getAppointment(vendorId) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async changeAppointmentStatus(
    appointmentId,
    status,
    canclereason,
    reschedule,
    completeOtp
  ) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async rescheduleAppointment(appointmentId, rescheduleDate) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async blockshopSlot(shopId, slotDate, slotTime, userId) {
    try {
      // here we have to check for vendor service and user service get functions

      const user = await User.findById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const vendor = await Vendor.findById(shopId);
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
      }

      const existingSlot = await SlotsAvaibility.findOne({
        vendorId: shopId,
        slotdate: moment(slotDate).format("YYYY-MM-DD"),
        slotstartTime: moment(slotTime, "hh:mm A").format("hh:mm A"),
        isBlocked: true,
      });

      if (existingSlot) {
        const error = new Error("Slot is already blocked");
        error.statusCode = 400;
        throw error;
      }

      const response = await SlotsAvaibility.create({
        vendorId: shopId,
        slotdate: moment(slotDate).format("YYYY-MM-DD"),
        slotstartTime: moment(slotTime, "hh:mm A").format("hh:mm A"),
        userId: userId,
        isBlocked: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AppointmentService();
