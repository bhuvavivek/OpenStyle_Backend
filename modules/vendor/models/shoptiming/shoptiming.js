const { Schema, model } = require("mongoose");

const daySchema = new Schema(
  {
    opentime: {
      type: String,
      default: "00:00",
      match: {
        value: /^([]:)$/,
      },
    },
    closetime: {
      type: String,
      default: "00:00",
    },
    shopisOpen: {
      type: Boolean,
      default: false,
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
  sunday: daySchema,
});

const Shoptiming = model("Shoptiming", shoptimingSchema);

module.exports = Shoptiming;
