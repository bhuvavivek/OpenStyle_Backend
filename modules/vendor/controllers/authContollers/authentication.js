const { response } = require("express");
const Vendor = require("../../models/vendor/vendor");

const vendorservice = require("../../services/vendorservice");

const handleCreateVendor = async (req, res, next) => {
  try {
    const vendorData = req.body;

    const result = await vendorservice.createVendor(vendorData);

    return res.status(201).json(result);
  } catch (error) {
    error(next);
  }
};

const handleSignin = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required" });
    }

    const token = await Vendor.matchPasswordAndGenerateToken(
      emailAddress,
      password
    );

    res.status(200).json({ message: "Signin in SucessFully", token });
  } catch (error) {
    if (
      error.message === "Vendor not found" ||
      error.message === "Incorrect Password"
    ) {
      return res.status(401).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "error logging in vendor", error: error.message });
  }
};
module.exports = {
  handleCreateVendor,
  handleSignin,
};
