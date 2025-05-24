"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { getFirstLetter } from "@/utils/utils";
import { COLORS } from "@/constants/colors";

export default function Header() {
  const theme = useTheme();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileData = { firstName: "S" };

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" sx={{ width: "100%" }}>
      <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={170}
                height={35}
                priority
              />
            </Link>

            {/* Navigation (Hidden on Mobile) */}
            <Box
              sx={{
                marginLeft: { xs: 0, sm: "100px" },
                display: { xs: "none", sm: "flex" },
                gap: 3,
                fontSize: "14px",
                color: "#333",
              }}
            >
              <Link href="/find-job" style={{ textDecoration: "none", color: "inherit" }}>
                Find your job
              </Link>
              <Link href="/job-status" style={{ textDecoration: "none", color: "inherit" }}>
                Job status
              </Link>
              <Link href="/messages" style={{ textDecoration: "none", color: "inherit" }}>
                Messages
              </Link>
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{
              backgroundColor: COLORS.BG_DARK_GREEN_COLOR,
              color: "white",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: { xs: "flex", sm: "none" }, // Show only on mobile
            }}
            edge="end"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>

          {/* Profile Icon (Hidden on Mobile) */}
          <IconButton
            edge="end"
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: COLORS.BG_DARK_GREEN_COLOR,
              color: "white",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: { xs: "none", sm: "flex" }, // Show only on larger screens
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {getFirstLetter(profileData?.firstName)}
            </Typography>
          </IconButton>

          {/* Mobile Menu */}
          {menuOpen && (
            <Box
              sx={{
                position: "absolute",
                top: 64,
                left: 0,
                width: "100%",
                backgroundColor: "white",
                boxShadow: 3,
                padding: 2,
                display: { xs: "flex", sm: "none" }, // Show only on mobile
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                fontSize: "16px",
                fontWeight: 500,
                color: "#333",
                zIndex: 50,
              }}
            >
              <Link href="/find-job" style={{ textDecoration: "none", color: "inherit", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>
                Find your job
              </Link>
              <Link href="/job-status" style={{ textDecoration: "none", color: "inherit", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>
                Job status
              </Link>
              <Link href="/messages" style={{ textDecoration: "none", color: "inherit", padding: "8px 0" }} onClick={() => setMenuOpen(false)}>
                Messages
              </Link>
            </Box>
          )}

          {/* Profile Dropdown Menu */}
          <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/settings">
              Settings
            </MenuItem>
          </MuiMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
