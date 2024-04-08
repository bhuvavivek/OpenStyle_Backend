const { Schema, model } = require("mongoose");
const moment = require("moment");

const daySchema = new Schema(
  {
    opentime: {
      type: String,
      default: "12:00 AM",
      required: { value: true, message: "opentime is required" },
      validate: {
        validator: function (v) {
          return moment(v, "hh:mm:A").isValid();
        },
        message: (props) =>
          `${props.value} is not a valid time Format must be in hh:mm A`,
      },
    },
    closetime: {
      type: String,
      default: "12:00 AM",
      required: { value: true, message: "closetime is required" },
      validate: {
        validator: function (v) {
          return moment(v, "hh:mm A").isValid();
        },
        message: (props) =>
          `${props.value} is not a valid time Format must be in hh:mm A`,
      },
    },
    shopisOpen: {
      type: Boolean,
      default: false,
      required: { value: true, message: "shopisOpen is required" },
    },
  },
  { _id: false }
);

const shoptimingSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: { value: true, message: "vendorId  is required" },
  },
  sunday: daySchema,
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
});

const Shoptiming = model("Shoptiming", shoptimingSchema);

module.exports = Shoptiming;
