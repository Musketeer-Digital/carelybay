// import NextAuth from "next-auth";
// import { authOptions } from "@/config/authOptions"; // Updated import

// const handler = NextAuth(authOptions);
// const auth = handler.auth;

// export { handler as GET, handler as POST };

import { handlers } from "@/lib/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers