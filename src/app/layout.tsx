import type { Metadata } from "next";
import ClientProvider from "./providers/client-provider";
import { SessionProvider } from "./providers/session-provider";
import Banner from "./components/layout/banner";

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
        <Banner />
        <ClientProvider>
          <SessionProvider>{children}</SessionProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
