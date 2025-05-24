"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

interface ButtonAppBarProps {
  session: Session | null;
}
export default function ButtonAppBar({ session }: ButtonAppBarProps) {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CarelyBay
          </Typography>
          {!session ? (
            <Button color="inherit" onClick={() => router.push("/signin")}>
              Login
            </Button>
          ) : (
            <p>hello {session.user?.name}</p>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
