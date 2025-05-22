import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
// --- imports for credentials provider ---
// import Credentials from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/mongodb";
// import OTP from "@/models/OTP";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";

// --- imports for other social provider ---
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  Google,
  Facebook,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  providers,
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(params) {
      console.log(params);
      return true;
    },
  },
});

// #TODO: do credentials

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