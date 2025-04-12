import { Document, Types } from "mongoose";

export interface User_Interface extends Document {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}