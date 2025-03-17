"use client";

import { Box, Grid, Link } from "@mui/material";
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
  const [profileBioDescription, setProfileBioDescription] = useState<string>(
    "Write something punchy ex: Experienced and Caring Nanny for Infants and Toddlers...",
  );
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
  const [selectedQualification, setSelectedQualification] =
    useState<string>("");

  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    if (userProfile?.personalInfo) {
      setProfileBioDescription(userProfile.personalInfo.bio || "");
      setSelectedCity(userProfile.personalInfo.city || "");
      setSelectedLanguages(userProfile.personalInfo.languages || []);
      setSelectedQualification(userProfile.personalInfo.qualification || "");
      setSelectedDOB({
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
    setSelectedCity(value);
  };

  const handleSelectDOB = (key: string, value: string) => {
    setSelectedDOB((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateProfileField = async (
    field: keyof typeof userProfile.personalInfo,
    value: any,
  ) => {
    try {
      if (!userProfile?.id) {
        console.error("Profile ID is missing");
        return;
      }

      const updatedProfile = await updateProfile(userProfile.id, {
        personalInfo: {
          ...userProfile.personalInfo,
          [field]: value,
        },
      });

      setUserProfile(updatedProfile); // Update Zustand state
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const profileBioList = getProfileBioComponents(
    selectedCity,
    selectedLanguages,
    selectedDOB,
    selectedQualification,
    setIsCityModalOpen,
    setIsLanguageModalOpen,
    setIsDOBModalOpen,
    setIsQualificationModalOpen,
  );
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
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <DOBSModal
        isDOBModalOpen={isDOBModalOpen}
        setIsDOBModalOpen={setIsDOBModalOpen}
        selectedDOB={selectedDOB}
        handleSelectDOB={handleSelectDOB}
        handleUpdateProfileField={handleUpdateProfileField}
      />

      <QualificationModal
        isQualificationModalOpen={isQualificationModalOpen}
        setIsQualificationModalOpen={setIsQualificationModalOpen}
        selectedQualification={selectedQualification}
        setSelectedQualification={setSelectedQualification}
        handleUpdateProfileField={handleUpdateProfileField}
      />
    </div>
  );
};

export default ProfileBio;
