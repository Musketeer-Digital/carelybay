"use client";

import CustomButton from "@/app/components/CustomButton";
import {
  Modal,
  Radio,
  Typography,
  Box,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

interface ProfileBioQualificationModalProps {
  isQualificationModalOpen: boolean;
  setIsQualificationModalOpen: (open: boolean) => void;
  qualifications: string[];
  selectedQualification: string;
  setSelectedQualification: (qualification: string) => void;
}

const QualificationModal: React.FC<ProfileBioQualificationModalProps> = ({
  isQualificationModalOpen,
  setIsQualificationModalOpen,
  qualifications,
  selectedQualification,
  setSelectedQualification,
}) => {
  return (
    <Modal
      open={isQualificationModalOpen}
      onClose={() => setIsQualificationModalOpen(false)}
      aria-labelledby="qualification-modal-title"
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
          Qualification
        </Typography>

        {/* Radio Group */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Select your qualification</FormLabel>
          <RadioGroup
            value={selectedQualification}
            onChange={(event) => setSelectedQualification(event.target.value)}
          >
            {qualifications.map((qualification) => (
              <FormControlLabel
                key={qualification}
                value={qualification}
                control={<Radio />}
                label={qualification}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Save Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          <CustomButton onClick={() => setIsQualificationModalOpen(false)}>
            Save
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default QualificationModal;
