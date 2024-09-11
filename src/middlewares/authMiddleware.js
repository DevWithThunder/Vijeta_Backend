const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
