const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DataBaseError = require("../utils/error_module/DataBaseError");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword) {
    throw DataBaseError("Invalid credentials");
  }
  console.log("candidatePassword::: ", candidatePassword);
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
