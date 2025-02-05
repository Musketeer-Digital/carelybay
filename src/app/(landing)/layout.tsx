import { Container, Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import Content1 from "../components/feature/content1";
import Content2 from "../components/feature/content2";

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
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: "flex", minHeight: "100vh", width: "100vw" }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 2,
          paddingTop: 8,
          paddingBottom: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>

      {/* Feature section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "rgba(240, 240, 240, 1)",
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Content2 />
      </Box>
    </Container>
  );
}
