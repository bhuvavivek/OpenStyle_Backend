const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 300,
    },
  },
  { timestamps: true }
);

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return;

  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp.toString(), salt);
  next();
});

const Otp = model("Otp", otpSchema);

module.exports = Otp;
