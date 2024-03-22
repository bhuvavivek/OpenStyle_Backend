const Appointment = require("../models/appointment/appointment");

class AppointmentService {
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
