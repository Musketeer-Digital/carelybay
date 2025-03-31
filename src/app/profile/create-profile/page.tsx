"use client";

import React from "react";
import { Grid, Typography, Box, Link, Divider } from "@mui/material";
import ProfileSidebar from "@/app/components/signup-marketing-panel/create-profile/profile-sidebar";
import ProfileTabs from "@/app/components/signup-marketing-panel/create-profile/profile-tabs";
import { COLORS } from "@/constants/colors";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <ProfileSidebar />
        </Grid>
        <Grid
          sx={{
            borderLeft: "1px solid #E4E4E4",
            pl: 5,
            mt: 2,
          }}
          item
          xs={12}
          md={8}
          lg={9}
        >
          <Box
            sx={{
              pl: 3,
            }}
          >
            <Box sx={{ mb: 3, pt: 4 }}>
              <Typography variant="h4" fontWeight="bold">
                Your Profile
              </Typography>
              <Typography color={COLORS.GREY_COLOR}>
                This information you share will be used across the platform to
                help other people get to know you.{" "}
                <Link href="/learn-more" sx={{ color: COLORS.GREY_COLOR }}>
                  Learn more
                </Link>
              </Typography>
            </Box>
            <ProfileTabs />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: 3,
          pb: 3,
        }}
      >
        <CustomButton
          variant="primary"
          onClick={() => router.push("/job/posts")}
          sx={{ px: 3, height: 40 }}
        >
          Go to Job Posts
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Profile;
