const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (userData) => {
  const user = new User(userData);
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { user, token };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return token;
};
