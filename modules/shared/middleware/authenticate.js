const { verifyToken } = require("../services/authentication");

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id };
    req.type = payload.type;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.toString() });
  }
};
