require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, (process.env.JWT_SECRET  || "SECRET_KEY"));
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(401).json({ message: "Invalid token." });
  }
};
