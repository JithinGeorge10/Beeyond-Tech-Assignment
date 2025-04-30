import  { Schema, model } from "mongoose";
import { User } from "../../../entities/User";

const userSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
    },
    createdAt:{
      type: Date,
    }
   
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", userSchema);