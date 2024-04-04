const { Schema, model } = require("mongoose");
const moment = require("moment");

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
    validate: {
      validator: function (value) {
        return moment(value, "YYYY-MM-DD").isValid();
      },
      message: (props) =>
        `${props.value} is not a valid date. Format must be in YYYY-MM-DD`,
    },
  },
  fromtime: {
    type: String,
    required: { value: true, message: "fromtime is required" },
    validate: {
      validator: function (v) {
        return moment(v, "HH:mm").isValid();
      },
      message: (props) =>
        `${props.value} is not a valid time Format must be in HH:mm`,
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
    enum: ["InPrograss", "Completed", "Confirmed", "Cancelled"],
    default: "Confirmed",
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
