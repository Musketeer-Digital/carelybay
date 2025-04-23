import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carelybay - Login/Signup",
  description: "Create your Carelybay account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
