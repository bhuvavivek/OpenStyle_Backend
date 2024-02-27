import { verifyToken } from "../services/authentication";

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id };
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.toString() });
  }
};
