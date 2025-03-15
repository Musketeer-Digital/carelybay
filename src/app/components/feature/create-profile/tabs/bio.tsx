"use client";

import { Box, Grid, Link } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import { useState } from "react";
import CityModal from "./bio-models/bio-city";
import LanguageModel from "./bio-models/bio-language";
import DOBSModal from "./bio-models/bio-dob";
import QualificationModal from "./bio-models/bio-qualification";
import ProfileBioDescription from "./bio-models/bio-description";
import { CakeIcon } from "@/app/components/icons/cake-icon";
import { MarkerIcon } from "@/app/components/icons/marker-icon";
import { LanguageIcon } from "@/app/components/icons/language-icon";
import { QualificationIcon } from "@/app/components/icons/qualification-icon";
import { COLORS } from "@/constants/colors";
import { updateProfile } from "@/utils/api/profile";
import { useProfileStore } from "@/store/profileSlice";

const ProfileBio: React.FC = () => {
  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState<boolean>(false);
  const [selectedQualification, setSelectedQualification] =
    useState<string>("");

  const [profileBioDescription, setProfileBioDescription] = useState<string>(
    "Write something punchy ex: Experienced and Caring Nanny for Infants and Toddlers...",
  );
  const [isBioDescriptionModelOpen, setIsDescriptionBioModelOpen] =
    useState<boolean>(false);

  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] =
    useState<boolean>(false);
  const [isDOBModalOpen, setIsDOBModalOpen] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDOB, setSelectedDOB] = useState<{
    month: string;
    day: string;
    year: string;
  }>({
    month: "",
    day: "",
    year: "",
  });

  const profileDetails = [
    {
      icon: <MarkerIcon color={selectedCity ? COLORS.PRIMARY_COLOR : ""} />,
      title: "Where I live",
      value: selectedCity || "Click to select",
      onClick: () => setIsCityModalOpen(true),
    },
    {
      icon: (
        <LanguageIcon
          color={selectedLanguages.length > 0 ? COLORS.PRIMARY_COLOR : ""}
        />
      ),
      title: "Languages",
      value:
        selectedLanguages.length > 0
          ? selectedLanguages.join(", ")
          : "Click to select",
      onClick: () => setIsLanguageModalOpen(true),
    },
    {
      icon: (
        <CakeIcon
          color={
            selectedDOB.month && selectedDOB.day && selectedDOB.year
              ? COLORS.PRIMARY_COLOR
              : ""
          }
        />
      ),
      title: "Date of Birth",
      value:
        selectedDOB.month && selectedDOB.day && selectedDOB.year
          ? `${selectedDOB.month} ${selectedDOB.day}, ${selectedDOB.year}`
          : "Click to select",
      onClick: () => setIsDOBModalOpen(true),
    },
    {
      icon: (
        <QualificationIcon
          color={selectedQualification ? COLORS.PRIMARY_COLOR : ""}
        />
      ),
      title: "Qualification",
      value: selectedQualification
        ? `${selectedQualification} `
        : "Click to select",
      onClick: () => setIsQualificationModalOpen(true),
    },
  ];

  const handleSelectCity = (value: string) => {
    setSelectedCity(value);
  };

  const handleSelectDOB = (key: string, value: string) => {
    setSelectedDOB((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateUserProfile = async (profileBioDescription: string) => {
    try {
      const { userProfile, setUserProfile } = useProfileStore.getState();

      if (!userProfile?.id) {
        console.error("Profile ID is missing");
        return;
      }

      const updatedProfile = await updateProfile(userProfile.id, {
        ...userProfile,
        personalInfo: {
          ...userProfile.personalInfo,
          bio: profileBioDescription,
        },
      });

      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update city:", error);
    }
  };

  return (
    <div>
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Profile Bio
        </Typography>
        <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, mb: 3 }}>
          <Typography color="textSecondary">{profileBioDescription}</Typography>
          <Link
            sx={{ marginTop: 3, cursor: "pointer" }}
            onClick={() => setIsDescriptionBioModelOpen(true)}
          >
            Add Intro
          </Link>
        </Box>
        <Grid container spacing={2}>
          {profileDetails.map((detail, index) => (
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
                  variant="body2"
                  fontWeight="bold"
                  color="textSecondary"
                >
                  {detail.value}
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
        profileBioDescription={profileBioDescription}
        setProfileBioDescription={setProfileBioDescription}
        handleUpdateUserProfile={handleUpdateUserProfile}
      />

      <CityModal
        isCityModalOpen={isCityModalOpen}
        setIsCityModalOpen={setIsCityModalOpen}
        handleSelectCity={handleSelectCity}
      />

      <LanguageModel
        isLanguageModalOpen={isLanguageModalOpen}
        setIsLanguageModalOpen={setIsLanguageModalOpen}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
      />
      <DOBSModal
        isDOBModalOpen={isDOBModalOpen}
        setIsDOBModalOpen={setIsDOBModalOpen}
        selectedDOB={selectedDOB}
        handleSelectDOB={handleSelectDOB}
      />

      <QualificationModal
        isQualificationModalOpen={isQualificationModalOpen}
        setIsQualificationModalOpen={setIsQualificationModalOpen}
        selectedQualification={selectedQualification}
        setSelectedQualification={setSelectedQualification}
      />
    </div>
  );
};

export default ProfileBio;
