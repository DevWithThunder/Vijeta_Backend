const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const Unauthorized = require("../utils/error_module/Unauthorized");
const RefreshToken = require("../models/refreshTokenModel");

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });
}

function generateRefreshToken(userId) {
  const token = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  return new RefreshToken({ token, userId, expiresAt });
}

exports.register = async ({ username, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw Unauthorized("Username already exists");
  }
  const user = new User({ username, password });
  await user.save();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id).save();

  return { accessToken, refreshToken: refreshToken.token };
};

exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    throw Unauthorized("Invalid credentials");
  }
  const accessToken = generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id).save();

  return {
    userId: user?._id,
    accessToken,
    refreshToken: refreshToken.token,
  };
};

exports.refreshAccessToken = async (refreshToken) => {
  const existingToken = await RefreshToken.findOne({ token: refreshToken });

  if (!existingToken || existingToken.expiresAt < Date.now())
    throw new Error("Refresh token expired or invalid");

  const userId = existingToken.userId;
  const accessToken = generateAccessToken(userId);

  return { accessToken };
};
