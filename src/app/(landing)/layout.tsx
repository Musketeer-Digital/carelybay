import { Box } from "@mui/material";
import type { Metadata } from "next";
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Carelybay - Login/Signup",
  description: "Create your Carelybay account",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <>
      {children}
      <Box>
        <p>
          <b>Current Session: </b>
        </p>
        {session && <pre>{JSON.stringify(session, null, 1)}</pre>}
      </Box>
    </>
  );
}
