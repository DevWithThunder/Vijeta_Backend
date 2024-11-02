const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
