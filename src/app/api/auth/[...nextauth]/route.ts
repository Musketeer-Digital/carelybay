import NextAuth from "next-auth";
import { authOptions } from "@/config/authOptions"; // Updated import

const handler = NextAuth(authOptions);
const auth = handler.auth;

export { handler as GET, handler as POST };
