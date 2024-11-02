const mongoose = require("mongoose");

const notifyMessagesTemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    messageBody: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "reminder-haircut",
        "reminder-shaving",
        "promotion",
        "alert",
        "general",
        "birthday",
      ],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const NotifyMessagesTemplate = mongoose.model(
  "Templates",
  notifyMessagesTemplateSchema
);

module.exports = NotifyMessagesTemplate;
