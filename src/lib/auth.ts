import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from "@/lib/prisma"
// --- imports for credentials provider ---
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";
import bcrypt from "bcryptjs";
import User from "@/models/User";
// --- imports for other social provider ---
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Facebook,
    // Credentials({
    //   name: "Credentials",
    //   id: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //     otp: { label: "OTP", type: "otp" },
    //   },
    //   async authorize(credentials) {
    //     await connectDB();

    //     const { email, password, otp } = credentials;

    //     if (otp) {
    //       // Find the most recent OTP for the email
    //       const recentOTP = await OTP.findOne({ email }).sort({
    //         createdAt: -1,
    //       });

    //       if (!recentOTP || otp !== recentOTP.otp) {
    //         throw new Error("Invalid OTP");
    //       }
    //     }

    //     const user = await User.findOne({
    //       email,
    //     }).select("+password");

    //     if (!user) throw new Error("Wrong Email");

    //     if (password && typeof password === "string") {
    //       const passwordMatch = await bcrypt.compare(
    //         password,
    //         user.password,
    //       );

    //       if (!passwordMatch) throw new Error("Wrong Password");
    //     } else {
    //       throw new Error("password is not a string")
    //     }
    //     return user;
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma)
});
