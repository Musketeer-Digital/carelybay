import { Container } from "@mui/material";
import type { Metadata } from "next";
import Banner from "../components/layout/banner";

export const metadata: Metadata = {
  title: "Carelybay - Login/Signup",
  description: "Create your Carelybay account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: 1,
          height: "100%",
        }}
        maxWidth="md"
      >
        {children}
      </Container>
    </>
  );
}
