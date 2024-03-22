const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: { value: true, message: "vendorId is required" },
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: { value: true, message: "customerId is required" },
  },
  serviceId: {
    type: [Schema.Types.ObjectId],
    ref: "Service",
  },
  coupenId: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  appointmentDate: {
    type: Date,
    default: Date.now(),
  },
  fromtime: {
    type: String,
    required: { value: true, message: "fromtime is required" },
    match: {
      value: /^([0-1][0-9]|2[0-3]:[0-5][0-9])$/,
      message: "from time must be in HH:MM format",
    },
  },
  totime: {
    type: String,
    required: { value: true, message: "totime is required" },
    match: {
      value: /^([0-1][0-9]|2[0-3]:[0-5][0-9])$/,
      message: "to time must be in HH:MM format",
    },
  },
  otpNumber: {
    type: Number,
    required: { value: true, message: "otpNumber is required" },
  },
  totalAmount: {
    type: Number,
    required: { value: true, message: "totalAmount is required" },
  },
  totalTime: {
    type: Number,
    required: { value: true, message: "totalTime is required" },
  },
  appointmentStatus: {
    type: String,
    enum: ["pending", "completed", "confirmed", "cancelled"],
    default: "pending",
    required: true,
  },
  cancelReason: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  rescheduleAppointment: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Appointment = model("Appointments", appointmentSchema);

module.exports = Appointment;
