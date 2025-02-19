"use client";

import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import ProfileHeader from "../components/profile-header";
import CustomButton from "../components/CustomButton";

const LandingScreen: React.FC = () => {
  return (
    <Box sx={{ padding: { xs: 3, sm: 8 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Your Profile
          </Typography>
          <Typography sx={{ color: "gray", marginBottom: 2 }}>
            You can easily update or customize your profile anytime in the
            settings section.
          </Typography>
          <ProfileHeader />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            textAlign: { xs: "center", sm: "left" },
            ml: { md: 20, sm: 10, xs: 0 },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            It's time to create your profile
          </Typography>
          <Typography sx={{ color: "gray", marginTop: 1 }}>
            Your Carelybay profile is an important part. Create yours to help
            other moms and helping family to get to know you.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              marginTop: 3,
            }}
          >
            <Link href="/profile" passHref>
              <CustomButton
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 50 }}
              >
                Create Profile
              </CustomButton>
            </Link>
            <Link href="/profile" passHref>
              <CustomButton
                variant="outlined"
                size="large"
                sx={{ borderRadius: 50 }}
              >
                Complete Profile Later
              </CustomButton>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingScreen;
