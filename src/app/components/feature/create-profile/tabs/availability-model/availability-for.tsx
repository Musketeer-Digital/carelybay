"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  ToggleButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { COLORS } from "@/constants/colors";

interface AvailabilityForModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleAvailabilitySelection: Function;
}

const AvailabilityForModal: React.FC<AvailabilityForModalProps> = ({
  isOpen,
  setIsOpen,
  handleAvailabilitySelection,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<
    string | null
  >(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);

  const availabilityOptions = ["Long term", "Short Term", "One time"];
  const urgencyOptions = [
    "As Soon As Possible (ASAP)",
    "Next Week",
    "Within Two Weeks",
    "Next Month",
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
          padding: "24px",
        },
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", pb: 3 }}>
        Availability
      </Typography>

      <DialogContent sx={{ px: 1 }}>
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
                  border: `1px solid ${isSelected ? `${COLORS.PRIMARY_COLOR} !important` : COLORS.BORDER_COLOR}`,
                  color: isSelected ? COLORS.PRIMARY_COLOR : COLORS.BLACK_COLOR,
                  textTransform: "none",
                  px: 2,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? `${COLORS.PRIMARY_COLOR} !important`
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
                  border: `1px solid ${isSelected ? `${COLORS.PRIMARY_COLOR} !important` : COLORS.BORDER_COLOR}`,
                  color: isSelected ? COLORS.PRIMARY_COLOR : COLORS.BLACK_COLOR,
                  textTransform: "none",
                  px: 2,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? `${COLORS.PRIMARY_COLOR} !important`
                      : COLORS.BG_LIGHT_GREY_COLOR,
                  },
                }}
              >
                {option}
              </ToggleButton>
            );
          })}
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ pt: 2, mb: 2 }}>
        <Button
          variant="primary"
          onClick={() => {
            setIsOpen(false);
            handleAvailabilitySelection({
              selectedAvailability,
              selectedUrgency,
            });
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilityForModal;
