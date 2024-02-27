const Otp = require("../models/otp");
const User = require("../../user/models/user");
const Vendor = require("../../vendor/models/vendor/vendor");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

const generateAndSendOtp = async (req, res) => {
  const { phoneNumber, emailAddress, userType } = req.body;

  let Model;

  if (userType === "User") {
    Model = User;
  } else if (userType === "Vendor") {
    Model = Vendor;
  } else {
    return res.status(400).json({ message: "invalid user type" });
  }

  const existingEntity = await Model.findOne({
    $or: [{ emailAddress }, { phoneNumber }],
  });

  if (existingEntity) {
    return res.status(400).json({
      message:
        existingEntity.emailAddress === emailAddress
          ? "Email Already Exist"
          : "PhoneNumber Already Exist",
    });
  }

  const generatedOtp = generateOtp();

  let otp = await Otp.findOne({ phoneNumber });

  if (otp) {
    otp.otp = generatedOtp;
  } else {
    otp = new Otp({ phoneNumber, otp: generatedOtp });
  }
  await otp.save();

  return res.status(201).json({
    message: "Otp generated and sent successfully",
    generatedOtp,
  });
};

module.exports = {
  generateAndSendOtp,
};
