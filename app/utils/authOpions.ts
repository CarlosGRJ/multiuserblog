import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "../models/User";
import { type NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import dbConnection from "../database/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", value: "" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        await dbConnection();

        const email = credentials?.email?.valueOf();
        const password = credentials?.password?.valueOf();

        if (!password) throw new Error("Invalid email or password");

        const user = await UserModel.findOne({ email });

        if (user == null) {
          throw new Error("Invalid email or password");
        }
        if ((user?.password).length === 0) {
          throw new Error("Please login via the method you used to sign up");
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user?.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }
        return user;
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};
