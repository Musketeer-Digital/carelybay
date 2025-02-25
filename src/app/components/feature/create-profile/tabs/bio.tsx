"use client";

import { Box, Grid } from "@mui/material";
import { Typography, Button, Divider } from "@mui/material";
import { Cake, Public, School, Place } from "@mui/icons-material";
import { useState } from "react";
import CityModal from "./bio-models/bio-city";
import LanguageModel from "./bio-models/bio-language";
import DOBSModal from "./bio-models/bio-dob";
import QualificationModal from "./bio-models/bio-qualification";

const ProfileBio: React.FC = () => {
  const qualificationsList: string[] = [
    "High School",
    "Bachelor Degree",
    "Master Degree",
    "Diploma",
    "Other",
  ];
  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState<boolean>(false);
  const [selectedQualification, setSelectedQualification] =
    useState<string>("");

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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  const cities = [
    "San Francisco, CA, USA",
    "New York, NY, USA",
    "Los Angeles, CA, USA",
    "Chicago, IL, USA",
    "Houston, TX, USA",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Arabic",
    "Hindi",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const profileDetails = [
    {
      icon: <Place fontSize="small" color="action" />,
      title: "Where I live",
      value: selectedCity || "Click to select",
      onClick: () => setIsCityModalOpen(true),
    },
    {
      icon: <Public fontSize="small" color="action" />,
      title: "Languages",
      value:
        selectedLanguages.length > 0
          ? selectedLanguages.join(", ")
          : "Click to select",
      onClick: () => setIsLanguageModalOpen(true),
    },
    {
      icon: <Cake fontSize="small" color="action" />,
      title: "Date of Birth",
      value:
        selectedDOB.month && selectedDOB.day && selectedDOB.year
          ? `${selectedDOB.month} ${selectedDOB.day}, ${selectedDOB.year}`
          : "Click to select",
      onClick: () => setIsDOBModalOpen(true),
    },
    {
      icon: <School fontSize="small" color="action" />,
      title: "Qualification",
      value: selectedQualification
        ? `${selectedQualification} `
        : "Click to select",
      onClick: () => setIsQualificationModalOpen(true),
    },
  ];

  const handleSelectCity = (value: any) => {
    setSelectedCity(value);
  };

  const handleSelectLanguages = (value: any) => {
    setSelectedLanguages(value);
  };

  const handleSelectDOB = (key: any, value: any) => {
    setSelectedDOB((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Profile Bio
        </Typography>
        <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 2, mb: 3 }}>
          <Typography color="textSecondary">
            Write something punchy ex: Experienced and Caring Nanny for Infants
            and Toddlers...
          </Typography>
          <Button sx={{ marginTop: 3 }} variant="contained">
            Add Intro
          </Button>
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
                <Typography variant="body1" fontWeight="bold">
                  {detail.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {detail.value}
                </Typography>
              </Box>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CityModal
        isCityModalOpen={isCityModalOpen}
        setIsCityModalOpen={setIsCityModalOpen}
        handleSelectCity={handleSelectCity}
      />

      <LanguageModel
        isLanguageModalOpen={isLanguageModalOpen}
        setIsLanguageModalOpen={setIsLanguageModalOpen}
        languages={languages}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
      />
      <DOBSModal
        isDOBModalOpen={isDOBModalOpen}
        setIsDOBModalOpen={setIsDOBModalOpen}
        selectedDOB={selectedDOB}
        handleSelectDOB={handleSelectDOB}
        months={months}
        days={days}
        years={years}
      />

      <QualificationModal
        isQualificationModalOpen={isQualificationModalOpen}
        setIsQualificationModalOpen={setIsQualificationModalOpen}
        qualifications={qualificationsList}
        selectedQualification={selectedQualification}
        setSelectedQualification={setSelectedQualification}
      />
    </div>
  );
};

export default ProfileBio;
