import mongoose, { type Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { type User } from "../interfaces/models/User";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema<User>(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true
    },
    password: String,
    role: {
      type: String,
      default: "subscriber"
    },
    image: String,
    resetCode: {
      data: String,
      expires: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
      }
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: "Is already taken."
});

const UserModel: Model<User> = models.User ?? model<User>("User", UserSchema);
export default UserModel;
