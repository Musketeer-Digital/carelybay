"use client";

import { useState, useEffect, MouseEvent } from "react";
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
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { getFirstLetter } from "@/utils/utils";
import { BG_DARK_GREEN_COLOR } from "@/constants/colors";

// Custom Hook to Check Mobile View
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default function Header() {
  const isMobile = useIsMobile();
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            {!isMobile && (
              <Box
                sx={{
                  marginLeft: "100px",
                  display: "flex",
                  gap: 3,
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                <Link
                  href="/find-job"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Find your job
                </Link>
                <Link
                  href="/job-status"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Job status
                </Link>
                <Link
                  href="/messages"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Messages
                </Link>
              </Box>
            )}
          </div>

          {/* Mobile Menu Icon */}
          {isMobile ? (
            <IconButton
              sx={{
                backgroundColor: BG_DARK_GREEN_COLOR,
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
              edge="end"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              onClick={handleMenuOpen}
              sx={{
                backgroundColor: BG_DARK_GREEN_COLOR,
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {getFirstLetter(profileData?.firstName)}
              </Typography>
            </IconButton>
          )}

          {isMobile && menuOpen && (
            <Box
              sx={{
                position: "absolute",
                top: 64,
                left: 0,
                width: "100%",
                backgroundColor: "white",
                boxShadow: 3,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                fontSize: "16px",
                fontWeight: 500,
                color: "#333",
                zIndex: 50,
              }}
            >
              <Link
                href="/find-job"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  padding: "8px 0",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Find your job
              </Link>
              <Link
                href="/job-status"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  padding: "8px 0",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Job status
              </Link>
              <Link
                href="/messages"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  padding: "8px 0",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Messages
              </Link>
            </Box>
          )}

          {/* Profile Dropdown Menu */}
          <MuiMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              href="/profile"
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              href="/settings"
            >
              Settings
            </MenuItem>
          </MuiMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
