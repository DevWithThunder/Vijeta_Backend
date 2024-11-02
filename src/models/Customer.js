const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    haircut_duration: {
      type: Number, // assuming this is in weeks or any specific unit
      default: null,
    },
    shaving_duration: {
      type: Number, // assuming this is in days or any specific unit
      default: null,
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avatar",
      default: null,
    },
    address: {
      type: String,
      default: "",
    },
    lastHaircutDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    lastShavingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
