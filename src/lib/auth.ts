import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from "@/lib/prisma"
// --- imports for credentials provider ---
// import Credentials from "next-auth/providers/credentials";
// import { connectDB } from "@/lib/mongodb";
// import OTP from "@/models/OTP";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// --- imports for other social provider ---
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { AuthError } from "next-auth";
import { CredentialsSignin, Account } from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Google,
    Facebook,
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(params) {
      console.log(params)
      return true
    },
  }
});
