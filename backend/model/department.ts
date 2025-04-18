import mongoose from "mongoose";

const Department_Schema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    campus_zone: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    contact_person_name: {
        type: String,
        required: true,
    },
    contact_person_email: {
        type: String,
        required: true,
        trim: true,
    },
    contact_person_title: {
        type: String,
        required: true,
        trim: true,
    },
  },
  { timestamps: true },
);

export const Department = mongoose.model("department", Department_Schema);