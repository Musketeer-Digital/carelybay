"use client";

import CustomButton from "@/app/components/CustomButton";
import { Modal, Select, Typography, Box, MenuItem } from "@mui/material";
import { useState } from "react";

interface ProfileBioCityModalProps {
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  cities?: string[];
  handleSelectCity?: (city: string) => void;
}

const CityModal: React.FC<ProfileBioCityModalProps> = ({
  isCityModalOpen,
  setIsCityModalOpen,
  handleSelectCity,
}) => {
  const cities = [
    "San Francisco, CA, USA",
    "New York, NY, USA",
    "Los Angeles, CA, USA",
    "Chicago, IL, USA",
    "Houston, TX, USA",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter cities based on search input
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      open={isCityModalOpen}
      onClose={() => setIsCityModalOpen(false)}
      aria-labelledby="city-modal-title"
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Where I Live
        </Typography>

        {/* City Dropdown */}
        <Select
          displayEmpty
          fullWidth
          value={searchTerm || ""}
          onChange={(event) => handleSelectCity(event.target.value as string)}
        >
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No matching city found</MenuItem>
          )}
        </Select>

        {/* Save Button at Bottom-Right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          <CustomButton onClick={() => setIsCityModalOpen(false)}>
            Save
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default CityModal;
