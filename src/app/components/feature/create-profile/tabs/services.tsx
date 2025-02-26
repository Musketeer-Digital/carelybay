"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Modal,
  Divider,
  IconButton,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SchoolIcon from "@mui/icons-material/School";
import PetsIcon from "@mui/icons-material/Pets";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessibleIcon from "@mui/icons-material/Accessible";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HotelIcon from "@mui/icons-material/Hotel";
import VideocamIcon from "@mui/icons-material/Videocam";
import { CalendarMonth, Add } from "@mui/icons-material";
import ServiceModal from "./service-model/service-model";
import AgeModal from "./service-model/service-age";
import AdditionalInfoModal from "./service-model/service-additional-info";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] =
    useState(false);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState([]);

  const ageGroups: string[] = [
    "0-11 months",
    "1-3 years",
    "4-5 years",
    "6-11 years",
    "12+ years",
  ];
  const [selectedAges, setSelectedAges] = useState<string[]>([]);

  const servicesList = [
    { label: "Cooking/Meal preparation", icon: <LocalDiningIcon /> },
    { label: "Pick-up/Drop off", icon: <DirectionsCarIcon /> },
    { label: "Light housekeeping", icon: <HomeIcon /> },
    { label: "Activities (e.g swimming)", icon: <EmojiEmotionsIcon /> },
    { label: "Putting kids to bed", icon: <SchoolIcon /> },
    { label: "Homework help", icon: <SchoolIcon /> },
    { label: "Bathing", icon: <ChildCareIcon /> },
    { label: "Virtual Care", icon: <VideocamIcon /> },
  ];

  const additionalInfoOptions = [
    { label: "Non-smoker", icon: <DirectionsCarIcon fontSize="small" /> },
    { label: "Own transport", icon: <DirectionsCarIcon fontSize="small" /> },
    { label: "Comfortable with pets", icon: <PetsIcon fontSize="small" /> },
    {
      label: "Willing to care for sick kids",
      icon: <EmojiEmotionsIcon fontSize="small" />,
    },
    {
      label: "Exp. with twins/multiples",
      icon: <VisibilityIcon fontSize="small" />,
    },
    {
      label: "Exp. with special needs",
      icon: <AccessibleIcon fontSize="small" />,
    },
    {
      label: "Exp. with nursing",
      icon: <MedicalServicesIcon fontSize="small" />,
    },
    {
      label: "Available for after-school care",
      icon: <SchoolIcon fontSize="small" />,
    },
    {
      label: "Interested in live-in jobs",
      icon: <HotelIcon fontSize="small" />,
    },
  ];

  const toggleAgeGroup = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((item) => item !== age) : [...prev, age],
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const toggleAdditionalInfo = (info: any) => {
    setSelectedAdditionalInfo((prev: any) => {
      if (prev.some((i: any) => i.label === info.label)) {
        return prev.filter((i: any) => i.label !== info.label);
      }
      return [...prev, info];
    });
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Services & Experience
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <ChildCareIcon /> What kind of child carer are you?
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#E0E8EF", color: "black" }}
        >
          👤 Babysitter
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <ChildCareIcon /> Add your Services provided
        </Typography>
        <Typography color="textSecondary">
          Skills Ex: Cooking/Meal preparation
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {selectedServices.length === 0 && (
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => setIsAgeModalOpen(true)}
        >
          <CalendarMonth /> I am comfortable caring for children aged *
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {selectedAges.length === 0 ? (
            <Typography color="textSecondary">
              Ex: “Newborn · up to 12 months”
            </Typography>
          ) : (
            selectedAges.map((age) => <Chip key={age} label={age} />)
          )}
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setIsAdditionalInfoModalOpen(true)}
      >
        Additional information
      </Button>

      {/* <ServiceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        servicesList={servicesList}
        selectedServices={selectedServices}
        toggleService={toggleService}
      />
      <AgeModal
        isAgeModalOpen={isAgeModalOpen}
        setIsAgeModalOpen={setIsAgeModalOpen}
        toggleAgeGroup={toggleAgeGroup}
      />
      <AdditionalInfoModal
        isAdditionalInfoModalOpen={isAdditionalInfoModalOpen}
        setIsAdditionalInfoModalOpen={setIsAdditionalInfoModalOpen}
        additionalInfoOptions={additionalInfoOptions}
        selectedAdditionalInfo={selectedAdditionalInfo}
        toggleAdditionalInfo={toggleAdditionalInfo}
      /> */}
    </Box>
  );
};

export default Services;
