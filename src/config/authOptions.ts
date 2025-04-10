import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions, Session } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import UserProfile from "@/models/UserProfile";
import OTP from "@/models/OTP";

export enum VerificationStatus {
  NotVerified = 1,
  MissingInfo = 2,
  Verified = 3,
}

export const authOptions: NextAuthOptions = {
  providers: [
    // * Logging in
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      },
    }),

    // * Logging in (Google)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),

    // * Logging in (Facebook)
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        await connectDB();
        const matchingUser = await User.findOne({
          email: user?.email,
        });

        return !!matchingUser;
      } else if (account?.provider === "credentials") {
        if (user) {
          return true;
        }
      }

      return false;
    },
    async session({ session }) {
      const populatedSession: Session & {
        status: VerificationStatus;
      } = { ...session, status: VerificationStatus.NotVerified };

      await connectDB();

      const user = await User.findOne({
        email: session?.user?.email,
      });

      // if (!user) {
      //   // Find the most recent OTP for the email
      //   const recentOTP = await OTP.findOne({ email: session?.user?.email });
      //   if (!recentOTP) {
      //     return session;
      //   }
      // }

      populatedSession.user = user.toJSON();

      const userProfile = await UserProfile.findOne({
        userId: user._id,
      });

      if (!userProfile || !userProfile.firstName || !userProfile.dob) {
        (populatedSession as any).status = VerificationStatus.MissingInfo;
      } else {
        (populatedSession as any).status = VerificationStatus.Verified;
      }

      return populatedSession;
    },
  },

  // TODO: Add callbacks signIn if GoogleProvider and FacebookProvider doesn't save to MongoDB
};
