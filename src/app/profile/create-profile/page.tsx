"use client";

import React from "react";
import { Grid, Typography, Box, Link, Divider } from "@mui/material";
import ProfileSidebar from "@/app/components/feature/create-profile/profile-sidebar";
import ProfileTabs from "@/app/components/feature/create-profile/profile-tabs";
import { COLORS } from "@/constants/colors";

const Profile = () => {
  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} md={4} lg={3}>
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
            height: "90dvh",
            overflow: "hidden",
            borderLeft: "1px solid #E4E4E4",
            pl: 5,
            mt: 2,
          }}
        >
          <Box sx={{ mb: 3, flexShrink: 0 }}>
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
