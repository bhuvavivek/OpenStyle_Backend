const moment = require("moment");
const { model, Schema } = require("mongoose");

const slotsAvaibilitySchema = new Schema(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    slotdate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return moment(v, "YYYY-MM-DD").isValid();
        },
        message: (props) =>
          `${props.value} is not a valid date Format must be in YYYY-MM-DD`,
      },
    },
    slotstartTime: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return moment(v, "HH:mm").isValid();
        },
        message: (props) =>
          `${props.value} is not a valid Time Format must be in HH:mm`,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 400 },
  },
  { timestamps: true }
);

slotsAvaibilitySchema.pre("save", function (next) {
  this.createdAt = new Date();
  next();
});

const SlotsAvaibility = model("SlotsAvaibility", slotsAvaibilitySchema);

module.exports = SlotsAvaibility;
