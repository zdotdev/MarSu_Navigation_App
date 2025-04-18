import mongoose from "mongoose";

const Location_Schema = new mongoose.Schema(
  {
    location_name: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    longtitude: {
        type: String,
        required: true,
    }
  },
  { timestamps: true },
);

export const Location = mongoose.model("location", Location_Schema);