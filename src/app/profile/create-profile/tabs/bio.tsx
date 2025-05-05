"use client";

import { Box, Grid, IconButton, Link } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import CityModal from "./bio-models/bio-city";
import LanguageModel from "./bio-models/bio-language";
import DOBSModal from "./bio-models/bio-dob";
import QualificationModal from "./bio-models/bio-qualification";
import ProfileBioDescription from "./bio-models/bio-description";
import { updateProfile } from "@/utils/api/profile";
import { useProfileStore } from "@/store/profileSlice";
import { getProfileBioComponents } from "@/utils/profileUtils";
import { GreaterIcon } from "@/app/components/icons/greater-icon";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";

const ProfileBio: React.FC = () => {
  // model toggle state
  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState<boolean>(false);
  const [isBioDescriptionModelOpen, setIsDescriptionBioModelOpen] =
    useState<boolean>(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] =
    useState<boolean>(false);
  const [isDOBModalOpen, setIsDOBModalOpen] = useState<boolean>(false);

  // local state
  const [storedProfileBio, setStoredProfileBio] = useState<string>(
    "Write something punchy ex: Experienced and Caring Nanny for Infants and Toddlers...",
  );
  const [storedCity, setStoredCity] = useState<string>("");
  const [storedLanguages, setStoredLanguages] = useState<string[]>([]);
  const [storedDOB, setStoredDOB] = useState<{
    month: string;
    day: string;
    year: string;
  }>({
    month: "",
    day: "",
    year: "",
  });
  const [storedQualification, setStoredQualification] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    if (userProfile?.personalInfo) {
      setStoredProfileBio(userProfile.personalInfo.bio || "");
      setStoredCity(userProfile.personalInfo.city || "");
      setStoredLanguages(userProfile.personalInfo.languages || []);
      setStoredQualification(userProfile.personalInfo.qualification || "");
      setStoredDOB({
        month: userProfile.personalInfo.dateOfBirth
          ? new Date(userProfile.personalInfo.dateOfBirth).toLocaleString(
              "default",
              { month: "long" },
            )
          : "",
        day: userProfile.personalInfo.dateOfBirth
          ? new Date(userProfile.personalInfo.dateOfBirth).getDate().toString()
          : "",
        year: userProfile.personalInfo.dateOfBirth
          ? new Date(userProfile.personalInfo.dateOfBirth)
              .getFullYear()
              .toString()
          : "",
      });
    }
  }, [userProfile]);

  const handleSelectCity = (value: string) => {
    setStoredCity(value);
  };

  const handleUpdateProfileField = async (
    field: keyof typeof userProfile.personalInfo,
    value: any,
  ) => {
    setIsLoading(true);
    try {
      if (!userProfile?._id) {
        console.error("Profile ID is missing");
        return;
      }

      const updatedProfile = await updateProfile({
        ...userProfile,
        personalInfo: {
          ...userProfile.personalInfo,
          [field]: value,
        },
      });
      setIsLoading(false);
      setUserProfile(updatedProfile); // Update Zustand state
    } catch (error) {
      setIsLoading(false);
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const profileBioList = getProfileBioComponents(
    storedCity,
    storedLanguages,
    storedDOB,
    storedQualification,
    setIsCityModalOpen,
    setIsLanguageModalOpen,
    setIsDOBModalOpen,
    setIsQualificationModalOpen,
  );
  return (
    <div>
      {isLoading && <FullscreenSpinner />}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, mt: 2 }}>
          Profile Bio
        </Typography>
        <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, mb: 3 }}>
          <Typography color="textSecondary">{storedProfileBio}</Typography>
          <Link
            sx={{ marginTop: 3, cursor: "pointer" }}
            onClick={() => setIsDescriptionBioModelOpen(true)}
          >
            {storedProfileBio ? "Edit" : "Add Intro"}
          </Link>
        </Box>
        <Grid container spacing={2}>
          {profileBioList.map((detail, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ cursor: "pointer", p: 1 }}
                onClick={detail.onClick}
              >
                {detail.icon}
                <Typography variant="body1">{detail.title}</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="body2"
                  fontWeight="bold"
                  color="textSecondary"
                >
                  {detail.value}{" "}
                  {detail.value && (
                    <IconButton
                      sx={{
                        ml: 0,
                        width: 24,
                        height: 24,
                        visibility: detail.value ? "visible" : "hidden",
                      }}
                    >
                      <GreaterIcon />
                    </IconButton>
                  )}
                </Typography>
              </Box>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ProfileBioDescription
        isBioDescriptionModelOpen={isBioDescriptionModelOpen}
        setIsDescriptionBioModelOpen={setIsDescriptionBioModelOpen}
        storedProfileBio={storedProfileBio}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <CityModal
        isCityModalOpen={isCityModalOpen}
        setIsCityModalOpen={setIsCityModalOpen}
        handleSelectCity={handleSelectCity}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <LanguageModel
        isLanguageModalOpen={isLanguageModalOpen}
        setIsLanguageModalOpen={setIsLanguageModalOpen}
        storedLanguages={storedLanguages}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <DOBSModal
        isDOBModalOpen={isDOBModalOpen}
        setIsDOBModalOpen={setIsDOBModalOpen}
        storedDOB={storedDOB}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <QualificationModal
        isQualificationModalOpen={isQualificationModalOpen}
        setIsQualificationModalOpen={setIsQualificationModalOpen}
        storedQualification={storedQualification}
        handleUpdateProfileField={handleUpdateProfileField}
      />
    </div>
  );
};

export default ProfileBio;
