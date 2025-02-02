import type { Metadata } from "next";
import ClientProvider from "./providers/client-provider";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

export const metadata: Metadata = {
  title: "Carelybay",
  description:
    "Carelybay is a platform connecting homeowners and service providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Logo and Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            gap: "1em",
            margin: "1em",
            marginLeft: "2em",
          }}
        >
          <Image
            src="https://placehold.co/28x28"
            alt="Logo"
            width={28}
            height={28}
            unoptimized
          />
          <Typography variant="h5">Logotype</Typography>
        </Box>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
