const jwt = require("jsonwebtoken");

const secret = "$Open@Style#@$";

const generateToken = (data) => {
  return jwt.sign({ id: data._id }, secret, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
