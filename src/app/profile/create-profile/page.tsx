"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { getUser } from "@/utils/api/user";
import { getProfileByUserId } from "@/utils/api/profile";
import { useProfileStore } from "@/store/profileSlice";
import { useUserStore } from "@/store/userSlice";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";
import ProfileSidebar from "./profile-sidebar";
import ProfileTabs from "./profile-tabs";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { setUserProfile, clearUserProfile } = useProfileStore();
  const { setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUserStore();

  useEffect(() => {
    initUserAndProfile();

    // return () => {
    //   clearUserProfile();
    //   clearUser();
    // };
  }, []);

  const initUserAndProfile = async () => {
    setIsLoading(true);

    try {
      if (!user?._id) return;

      const profile = await getProfileByUserId(user._id);
      if (profile?._id) {
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Failed to fetch user/profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: isMobile ? "100%" : "90vh", overflow: "hidden" }}>
      {isLoading && <FullscreenSpinner />}

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
