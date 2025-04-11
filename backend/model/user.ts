import mongoose from "mongoose";

const User_Schema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String,
    }
  },
  { timestamps: true },
);

export const User = mongoose.model("user", User_Schema);