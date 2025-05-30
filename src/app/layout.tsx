import type { Metadata } from "next";
import MuiThemeProvider from "@/components/providers/MuiThemeProvider";
// import { SessionProvider } from "@/components/providers/session-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { auth } from "@/lib/auth";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Carelybay",
  description:
    "Carelybay is a platform connecting homeowners and service providers",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const session = await auth();
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <ResponsiveAppBar session={await auth()} />
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
