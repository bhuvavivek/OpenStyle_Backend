const jwt = require("jsonwebtoken");

const secret = "$dmeo@4238943cvmdfjkv";

const generateToken = (vendor) => {
  return jwt.sign({ id: vendor._id }, secret, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
