"use client";

import { useState } from "react";
import { Typography, ToggleButton, Box, Divider } from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { availabilityOptions, urgencyOptions } from "../../profile-options";

interface AvailabilityForModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleAvailabilitySelection: Function;
  handleUpdateProfileField: Function;
}

const AvailabilityForModal: React.FC<AvailabilityForModalProps> = ({
  isOpen,
  setIsOpen,
  handleAvailabilitySelection,
  handleUpdateProfileField,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);

  return (
    <CustomDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Availability"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            setIsOpen(false);
            handleAvailabilitySelection({
              selectedAvailability,
              selectedUrgency,
            });
            handleUpdateProfileField("availableFor", {
              availability: selectedAvailability,
              urgency: selectedUrgency,
            });
          }}
          sx={{ px: 3, height: 40 }}
        >
          Save
        </CustomButton>
      }
    >
      <Typography
        variant="body1"
        fontWeight="500"
        sx={{ textAlign: "left", mb: 1 }}
      >
        Available For
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {availabilityOptions.map((option) => {
          const isSelected = selectedAvailability === option;
          return (
            <ToggleButton
              key={option}
              value={option}
              selected={isSelected}
              onClick={() => setSelectedAvailability(option)}
              sx={{
                borderRadius: "24px",
                backgroundColor: isSelected
                  ? `${COLORS.BG_LIGHT_ORANGE_COLOR} !important`
                  : "",
                border: `1px solid ${
                  isSelected
                    ? `${COLORS.PRIMARY_COLOR} !important`
                    : COLORS.BORDER_COLOR
                }`,
                color: isSelected ? COLORS.PRIMARY_COLOR : COLORS.BLACK_COLOR,
                textTransform: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: isSelected
                    ? `${COLORS.BG_LIGHT_ORANGE_COLOR} !important`
                    : COLORS.BG_LIGHT_GREY_COLOR,
                },
              }}
            >
              {option}
            </ToggleButton>
          );
        })}
      </Box>

      <Typography
        variant="body1"
        fontWeight="500"
        sx={{ textAlign: "left", mt: 3, mb: 1 }}
      >
        Urgency
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {urgencyOptions.map((option) => {
          const isSelected = selectedUrgency === option;
          return (
            <ToggleButton
              key={option}
              value={option}
              selected={isSelected}
              onClick={() => setSelectedUrgency(option)}
              sx={{
                borderRadius: "24px",
                backgroundColor: isSelected
                  ? `${COLORS.BG_LIGHT_ORANGE_COLOR} !important`
                  : "",
                border: `1px solid ${
                  isSelected
                    ? `${COLORS.PRIMARY_COLOR} !important`
                    : COLORS.BORDER_COLOR
                }`,
                color: isSelected ? COLORS.PRIMARY_COLOR : COLORS.BLACK_COLOR,
                textTransform: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: isSelected
                    ? `${COLORS.BG_LIGHT_ORANGE_COLOR} !important`
                    : COLORS.BG_LIGHT_GREY_COLOR,
                },
              }}
            >
              {option}
            </ToggleButton>
          );
        })}
      </Box>
    </CustomDialog>
  );
};

export default AvailabilityForModal;
