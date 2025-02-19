"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProfileTabs from "../components/feature/create-profile/profile-tabs";
import ProfileSidebar from "../components/feature/create-profile/profile-sidebar";

const Profile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <ProfileSidebar />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box sx={{ pl: 3, mb: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              Your Profile
            </Typography>
            <Typography color="gray">
              This information you share will be used across the platform to
              help other people get to know you.
            </Typography>
          </Box>
          <ProfileTabs />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
