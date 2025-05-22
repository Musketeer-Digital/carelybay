import type { Metadata } from "next";
// import ClientProvider from "./providers/client-provider";
// import { SessionProvider } from "./providers/session-provider";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "./globals.css";

export const NAVIGATION = [
  // ...
  {
    segment: "orders",
    title: "Orders",
  },
  // ...
];

export const metadata: Metadata = {
  title: "Carelybay",
  description:
    "Carelybay is a platform connecting homeowners and service providers",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppRouterCacheProvider>
          <NextAppProvider>{children}</NextAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// <html lang="en" style={{ height: "100%" }}>
//   <body
//     style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
//   >
//     <ClientProvider>
//       <SessionProvider>{children}</SessionProvider>
//     </ClientProvider>
//   </body>
// </html>
