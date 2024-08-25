import { type Document } from "mongoose";

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  resetCode: {
    data: string;
    expires: Date;
  };
}
