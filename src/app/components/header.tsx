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
} from "@mui/material";
import { getFirstLetter } from "@/utils/utils";
import { COLORS } from "@/constants/colors";
import { HamBurgerMenuIcon } from "./icons/HamBurgerMenuIcon";
import { useUserStore } from "@/store/userSlice";
import { usePathname } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const pathname = usePathname();

  const { user } = useUserStore();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        width: "100%",
        boxShadow: "none",
        borderBottom: "1px solid #f0f0f0",
        borderRadius: "unset",
      }}
    >
      <Container maxWidth={false} sx={{ px: 0 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            position: "relative",
          }}
        >
          <Box sx={{ display: { xs: "flex", sm: "none" }, zIndex: 2 }}>
            <IconButton
              sx={{
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
              }}
              edge="start"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HamBurgerMenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: { xs: "absolute", sm: "static" },
              left: 0,
              right: 0,
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={214}
                height={39.303}
                priority
              />
            </Link>
          </Box>

          {/* Desktop */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 4,
              flex: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 3, ml: 5 }}>
              <Link
                href="/find-job"
                style={{
                  textDecoration: "none",
                  color:
                    pathname === "/find-job" ? COLORS.PRIMARY_COLOR : "inherit",
                }}
              >
                Find your job
              </Link>
              <Link
                href="/job-status"
                style={{
                  textDecoration: "none",
                  color:
                    pathname === "/job-status"
                      ? COLORS.PRIMARY_COLOR
                      : "inherit",
                }}
              >
                Job status
              </Link>
              <Link
                href="/messages"
                style={{
                  textDecoration: "none",
                  color:
                    pathname === "/messages" ? COLORS.PRIMARY_COLOR : "inherit",
                }}
              >
                Messages
              </Link>
            </Box>
          </Box>

          <IconButton
            edge="end"
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: COLORS.BG_DARK_GREEN_COLOR,
              color: "white",
              width: 45,
              height: 45,
              borderRadius: "50%",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "#004d40",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 28, fontWeight: "bold" }}>
              {getFirstLetter(user?.name ?? "S")}
            </Typography>
          </IconButton>
        </Toolbar>

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
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              fontSize: "16px",
              fontWeight: 500,
              color: "#333",
              zIndex: 1,
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

        {/* Profile Dropdown */}
        <MuiMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} href="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} href="/settings">
            Settings
          </MenuItem>
        </MuiMenu>
      </Container>
    </AppBar>
  );
};
export default Header;
