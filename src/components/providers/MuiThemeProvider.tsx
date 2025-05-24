"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { CssBaseline } from "@mui/material";

export default function MuiThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
