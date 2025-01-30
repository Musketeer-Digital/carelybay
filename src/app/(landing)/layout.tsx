import { Container, Box } from "@mui/material";
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
  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 2, padding: "20px" }}>{children}</Box> 
      {/* Feature section */}
      <Box sx={{ flex: 1, backgroundColor: "rgba(240, 240, 240, 1)", padding: "20px" }}>
        <h2>Feature Section</h2>
        <p>Details about the feature...</p>
      </Box>
    </Container>
  )
}
