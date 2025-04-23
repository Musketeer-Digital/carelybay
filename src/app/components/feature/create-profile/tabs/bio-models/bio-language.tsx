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
  Checkbox,
  IconButton,
} from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { SearchIcon } from "@/app/components/icons/search-icon";
import { languagesOptions } from "../../profile-options";

interface ProfileBioLanguageModalProps {
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;

  storedLanguages: string[];
  handleUpdateProfileField: Function;
}

const LanguageModal: React.FC<ProfileBioLanguageModalProps> = ({
  isLanguageModalOpen,
  setIsLanguageModalOpen,
  storedLanguages,
  handleUpdateProfileField,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (storedLanguages.length) {
      setSelectedLanguages(storedLanguages);
    }
  }, [isLanguageModalOpen]);

  const filteredLanguages = languagesOptions.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectLanguage = (language: string) => {
    const updatedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((lang) => lang !== language)
      : [...selectedLanguages, language];

    setSelectedLanguages(updatedLanguages);
  };

  return (
    <CustomDialog
      open={isLanguageModalOpen}
      onClose={() => setIsLanguageModalOpen(false)}
      title="Language I Speak"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            setIsLanguageModalOpen(false);
            handleUpdateProfileField("languages", selectedLanguages);
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
          filteredLanguages.map((language, index) => (
            <ListItem key={language + index} disablePadding>
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
    </CustomDialog>
  );
};

export default LanguageModal;
