const Service = require("../../vendor/models/service/service");
const Vendor = require("../../vendor/models/vendor/vendor");
const service = require("../../vendor/services/service");
const Appointment = require("../models/appointment/appointment");
const Coupon = require("../models/coupon/coupon");

class AppointmentService {
  async setSummerySession(session, data) {
    try {
      const { vendorId, serviceId, coupenId, appointmentDate } = data;

      if (session && data) {
        // If session.summery doesn't exist, initialize it with an empty object
        if (!session.summery) {
          session.summery = {
            vendorId: null,
            serviceId: [],
            coupenId: null,
          };
        }

        // Merge the new data with the existing session.summery data
        if (vendorId) {
          session.summery.vendorId = vendorId;
        }

        if (serviceId && serviceId.length > 0) {
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

          session.summery.serviceDetails = serviceDetails;

          const serviceAmounts = serviceDetails.reduce(
            (acc, service) => acc + service.servicePrice,
            0
          );

          session.summery.serviceAmounts = serviceAmounts;
        }

        if (coupenId) {
          session.summery.coupenId = coupenId;
        }

        if (appointmentDate) {
          session.summery.appointmentDate = appointmentDate;
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

  async createAppointment(appointmentData) {
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
}

module.exports = new AppointmentService();
