"use client";

import { Modal, Input, Button, Checkbox, Typography, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import CustomButton from "@/app/components/CustomButton";

interface ProfileBioLanguageModelProps {
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  languages: string[];
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
}

const LanguageModel: React.FC<ProfileBioLanguageModelProps> = ({
  isLanguageModalOpen,
  setIsLanguageModalOpen,
  languages,
  selectedLanguages,
  setSelectedLanguages,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search Filter Logic
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
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          backgroundColor: "white",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Language I Speak
        </Typography>

        {/* Search Input with Icon */}
        <Box sx={{ position: "relative", marginBottom: 2 }}>
          <Input
            placeholder="Search for a language"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            sx={{ position: "absolute", left: 10, top: 10, color: "gray" }}
          />
        </Box>

        {/* Scrollable Language List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "250px",
            paddingRight: 2,
          }}
        >
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <Box
                key={lang}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() => handleSelectLanguage(lang)}
              >
                <Typography>{lang}</Typography>
                <Checkbox checked={selectedLanguages.includes(lang)} />
              </Box>
            ))
          ) : (
            <Typography align="center" color="textSecondary">
              No matching languages found
            </Typography>
          )}
        </Box>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
          <CustomButton onClick={() => setIsLanguageModalOpen(false)}>
            Save
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default LanguageModel;
