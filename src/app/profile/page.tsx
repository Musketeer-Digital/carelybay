"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProfileHeader from "../components/ProfileHeader";
import CustomButton from "../components/CustomButton";
import Link from "next/link";
import { createProfile, getProfileByUserId } from "@/utils/api/profile";
import { useProfileStore } from "@/store/profileSlice";
import { IUserProfile } from "@/models/ProfileModel";
import { useRouter } from "next/navigation";
import { FullscreenSpinner } from "../components/feature/CustomSpinner";
import { getUser } from "@/utils/api/user";
import { useUserStore } from "@/store/userSlice";

const LandingScreen: React.FC = () => {
  const { setUserProfile, clearUserProfile } = useProfileStore();
  const { user, setUser, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user._id) {
      fetchUser();
    }

    // return () => {
    //   clearUserProfile();
    //   clearUser();
    // };
  }, [user]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const userId = "67ddd8d4226ba4f84adc4a74";
      const user = await getUser(userId);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setIsLoading(false);
    }
  };

  const onCreateProfile = async () => {
    if (!user?._id) return;

    setIsLoading(true);

    try {
      let profile: IUserProfile | null = null;

      try {
        profile = await getProfileByUserId(user._id);
      } catch (error: any) {
        if (error === "Profile not found") {
          const initialProfileDetails: Partial<IUserProfile> = {
            userId: user._id,
            firstName: "New User",
            lastName: "Profile",
          };

          profile = await createProfile(initialProfileDetails);
        } else {
          throw error;
        }
      }

      if (profile) {
        setUserProfile(profile);
        router.push("/profile/create-profile#personal-info");
      }
    } catch (error) {
      console.error("Failed to fetch or create profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 3, sm: 6, md: 10 },
        width: "100%",
        maxWidth: "1400px",
      }}
    >
      {isLoading && <FullscreenSpinner />}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Your Profile
          </Typography>
          <Typography sx={{ color: "gray", marginBottom: 2 }}>
            You can easily update or customize your profile anytime in the
            settings section.
          </Typography>
          <Box
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <ProfileHeader />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          lg={6}
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
              justifyContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 2,
              marginTop: 3,
              width: "100%",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <CustomButton
                variant="primary"
                size="large"
                fullWidth
                onClick={onCreateProfile}
                sx={{
                  borderRadius: 50,
                }}
              >
                Create Profile
              </CustomButton>
            </Box>

            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Link href="/profile" passHref>
                <CustomButton
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 50,
                  }}
                >
                  Complete Profile Later
                </CustomButton>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingScreen;
