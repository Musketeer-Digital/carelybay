"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { CssBaseline } from "@mui/material";
import Header from "../components/Header";

export default function ClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
