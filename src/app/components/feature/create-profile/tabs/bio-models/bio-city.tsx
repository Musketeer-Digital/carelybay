"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";

const cities = [
  "San Francisco, CA, USA",
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "Chicago, IL, USA",
  "Houston, TX, USA",
];

interface ProfileBioCityModalProps {
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  handleSelectCity: (city: string) => void;
}

const CityModal: React.FC<ProfileBioCityModalProps> = ({
  isCityModalOpen,
  setIsCityModalOpen,
  handleSelectCity,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Filter cities based on search input
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Modal
      open={isCityModalOpen}
      onClose={() => setIsCityModalOpen(false)}
      aria-labelledby="city-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "600px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginBottom: "16px" }}
        >
          Where I live
        </Typography>

        {/* Search Field */}
        <Box sx={{ position: "relative", width: "100%", marginBottom: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for your city"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              borderRadius: "24px",
              backgroundColor: "#F5F5F5",
              "& .MuiOutlinedInput-root": {
                borderRadius: "24px",
                paddingRight: "40px",
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "gray",
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {filteredCities.length > 0 ? (
          <List sx={{ width: "100%", maxHeight: "350px", overflowY: "auto" }}>
            {filteredCities.map((city) => (
              <ListItem key={city} disablePadding>
                <ListItemButton
                  selected={selectedCity === city}
                  onClick={() => setSelectedCity(city)}
                  sx={{
                    borderRadius: "8px",
                    padding: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText
                    primary={city}
                    primaryTypographyProps={{
                      fontWeight: selectedCity === city ? "bold" : "normal",
                    }}
                  />
                  {selectedCity === city && (
                    <CheckIcon sx={{ color: "#FF6600" }} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="textSecondary">No matching city found</Typography>
        )}
        <Divider />
        <Box sx={{ width: "100%", marginTop: "16px", textAlign: "right" }}>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedCity) {
                handleSelectCity(selectedCity);
                setIsCityModalOpen(false);
              }
            }}
            disabled={!selectedCity}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CityModal;
