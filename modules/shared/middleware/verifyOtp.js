const bycrypt = require("bcrypt");
const Otp = require("../models/otp");
const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor/vendor");

const otpVerification = async (req, res, next) => {
  try {
    const { phoneNumber, otp, emailAddress, userType } = req.body;

    // Check if the email and phone number already exist

    let Model;

    if (userType === "User") {
      Model = User;
    } else if (userType === "Vendor") {
      Model = Vendor;
    } else {
      return res.status(400).json({ message: "invalid userType" });
    }

    const existingEntity = await Model.findOne({
      $or: [{ emailAddress }, { phoneNumber }],
    });

    if (existingEntity) {
      return res.status(400).json({
        message:
          existingEntity.emailAddress === emailAddress
            ? "Email Aready Exist"
            : "PhoneNumber Already Exist",
      });
    }

    const otpDoc = await Otp.findOne({ phoneNumber });

    if (!otpDoc) return res.status(404).json({ message: "OTP is Expired " });

    const isMatch = await bycrypt.compare(otp.toString(), otpDoc.otp);

    if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

    await Otp.findByIdAndDelete(otpDoc._id);

    next();
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred in OTP Verification",
      error: error.message,
    });
  }
};

module.exports = { otpVerification };
