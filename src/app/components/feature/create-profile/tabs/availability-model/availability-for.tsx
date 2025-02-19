"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CustomButton from "@/app/components/CustomButton";

interface AvailabilityForModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AvailabilityForModal: React.FC<AvailabilityForModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");

  const availabilityOptions = ["Long term", "Short Term", "One time"];
  const urgencyOptions = [
    "As Soon As Possible (ASAP)",
    "Next Week",
    "Within Two Weeks",
    "Next Month",
  ];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Availability
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Available For Section */}
        <Typography
          variant="body1"
          color="textSecondary"
          fontWeight="medium"
          gutterBottom
        >
          Available For
        </Typography>
        <ToggleButtonGroup
          value={selectedAvailability}
          exclusive
          onChange={(_, value) => setSelectedAvailability(value)}
          fullWidth
        >
          {availabilityOptions.map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Urgency Section */}
        <Typography
          variant="body1"
          color="textSecondary"
          fontWeight="medium"
          gutterBottom
          sx={{ mt: 3 }}
        >
          Urgency
        </Typography>
        <ToggleButtonGroup
          value={selectedUrgency}
          exclusive
          onChange={(_, value) => setSelectedUrgency(value)}
          fullWidth
        >
          {urgencyOptions.map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="contained"
          color="warning"
          onClick={() => setIsOpen(false)}
        >
          Done
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilityForModal;
