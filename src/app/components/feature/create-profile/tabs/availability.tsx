"use client";

import { useState } from "react";
import { Typography, Box, Divider, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import AvailabilityRatesModal from "./availability-model/availability-rates";
import AvailabilityForModal from "./availability-model/availability-for";
import AvailabilitySetModal from "./availability-model/availability-set";

const Availability = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  const availabilityOptions = [
    {
      title: "Available For",
      description: "Long-Term · As Soon As Possible (ASAP)",
      onClick: () => setIsOpen(true),
    },
    {
      title: "Set your Rates",
      description: "Ex: “Newborn · up to 12 months”",
      onClick: () => setIsRatesModalOpen(true),
    },
    {
      title: "Set your availability",
      description: "Ex: “Newborn · up to 12 months”",
      onClick: () => setIsAvailabilityModalOpen(true),
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Availability & Rates
      </Typography>
      <Box sx={{ mt: 2 }}>
        {availabilityOptions.map((option, index) => (
          <Box
            key={index}
            onClick={option.onClick}
            sx={{ cursor: "pointer", p: 2 }}
          >
            <Typography
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <ChildCareIcon />
              <span style={{ flexGrow: 1 }}>{option.title}</span>
              <IconButton size="small">
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {option.description}
            </Typography>
            {index < availabilityOptions.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        ))}
      </Box>
      <AvailabilityRatesModal
        isRatesModalOpen={isRatesModalOpen}
        setIsRatesModalOpen={setIsRatesModalOpen}
      />
      <AvailabilityForModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <AvailabilitySetModal
        isAvailabilityModalOpen={isAvailabilityModalOpen}
        setIsAvailabilityModalOpen={setIsAvailabilityModalOpen}
      />
    </Box>
  );
};

export default Availability;
