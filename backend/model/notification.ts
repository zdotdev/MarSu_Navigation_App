import mongoose from "mongoose";

const Notification_Schema = new mongoose.Schema(
  {
    notification_title: {
        type: String,
        required: true,
        trim: true,
    },
    notification_details: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true },
);

export const Notification = mongoose.model("notification", Notification_Schema);