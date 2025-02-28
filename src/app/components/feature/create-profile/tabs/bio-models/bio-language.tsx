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
  Checkbox,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "@/constants/colors";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Arabic",
  "Hindi",
];

interface ProfileBioLanguageModalProps {
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
}

const LanguageModal: React.FC<ProfileBioLanguageModalProps> = ({
  isLanguageModalOpen,
  setIsLanguageModalOpen,
  selectedLanguages,
  setSelectedLanguages,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter languages based on search input
  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectLanguage = (language: string) => {
    const updatedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((lang) => lang !== language)
      : [...selectedLanguages, language];

    setSelectedLanguages(updatedLanguages);
  };

  return (
    <Modal
      open={isLanguageModalOpen}
      onClose={() => setIsLanguageModalOpen(false)}
      aria-labelledby="language-modal-title"
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
          Language I Speak
        </Typography>

        <Box sx={{ position: "relative", width: "100%", marginBottom: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for a language"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              borderRadius: "24px",
              backgroundColor: COLORS.BG_LIGHT_GREY_COLOR,
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

        <List sx={{ width: "100%", maxHeight: "350px", overflowY: "auto" }}>
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((language) => (
              <ListItem key={language} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectLanguage(language)}
                  sx={{
                    borderRadius: "8px",
                    padding: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ListItemText primary={language} />
                  <Checkbox
                    checked={selectedLanguages.includes(language)}
                    sx={{
                      color: "#FF6600",
                      "&.Mui-checked": {
                        color: "#FF6600",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography color="textSecondary" align="center">
              No matching languages found
            </Typography>
          )}
        </List>

        <Divider />
        <Box sx={{ width: "100%", marginTop: "16px", textAlign: "right" }}>
          <Button
            variant="primary"
            onClick={() => setIsLanguageModalOpen(false)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LanguageModal;
