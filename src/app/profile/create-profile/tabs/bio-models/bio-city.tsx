"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";
import { CheckIcon } from "@/app/components/icons/check-icon";
import { SearchIcon } from "@/app/components/icons/search-icon";
import { citiesOptions } from "../../../../components/profile-options";

interface ProfileBioCityModalProps {
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  handleSelectCity: (city: string) => void;
  handleUpdateProfileField: Function;
}

const CityModal: React.FC<ProfileBioCityModalProps> = ({
  isCityModalOpen,
  setIsCityModalOpen,
  handleSelectCity,
  handleUpdateProfileField,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {});

  // Filter citiesOptions based on search input
  const filteredCities = citiesOptions.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CustomDialog
      open={isCityModalOpen}
      onClose={() => setIsCityModalOpen(false)}
      title="Where I live"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            if (selectedCity) {
              handleUpdateProfileField("city", selectedCity);
              handleSelectCity(selectedCity);
              setIsCityModalOpen(false);
            }
          }}
          sx={{
            px: 3,

            height: 40,
            color: COLORS.WHITE_COLOR,
          }}
        >
          Save
        </CustomButton>
      }
    >
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
          {filteredCities.map((city, index) => (
            <ListItem key={city + index} disablePadding>
              <ListItemButton
                selected={selectedCity === city}
                onClick={() => {
                  if (city === selectedCity) {
                    setSelectedCity("");
                  } else {
                    setSelectedCity(city);
                  }
                }}
                sx={{
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "transparent!important",
                }}
              >
                <ListItemText
                  primary={city}
                  primaryTypographyProps={{
                    fontWeight: selectedCity === city ? "bold" : "normal",
                  }}
                />
                {selectedCity === city && <CheckIcon color={"#FF6817"} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="textSecondary">No matching city found</Typography>
      )}
    </CustomDialog>
  );
};

export default CityModal;
