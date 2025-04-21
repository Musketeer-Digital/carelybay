"use client";

import React from "react";
import {
  Grid,
  Typography,
  Box,
  Link,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProfileSidebar from "@/app/components/feature/create-profile/profile-sidebar";
import ProfileTabs from "@/app/components/feature/create-profile/profile-tabs";
import { COLORS } from "@/constants/colors";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ height: isMobile ? "100%" : "90vh", overflow: "hidden" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{ height: "100%", overflowY: "auto" }}
        >
          <ProfileSidebar />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
            borderLeft: "1px solid #E4E4E4",
            pl: 3,
          }}
        >
          <Box sx={{ mb: 3, flexShrink: 0, pt: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              Your Profile
            </Typography>
            <Typography color={COLORS.GREY_COLOR}>
              This information you share will be used across the platform to
              help others.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minHeight: 0 }}>
            <ProfileTabs />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
