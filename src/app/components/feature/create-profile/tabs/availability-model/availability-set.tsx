"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { COLORS } from "@/constants/colors";
import { PlusIcon } from "@/app/components/icons/plus-icon";

interface AvailabilitySetModalProps {
  isAvailabilityModalOpen: boolean;
  setIsAvailabilityModalOpen: (open: boolean) => void;
  onSelectAvailabilitySet: Function;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AvailabilitySetModal: React.FC<AvailabilitySetModalProps> = ({
  isAvailabilityModalOpen,
  setIsAvailabilityModalOpen,
  onSelectAvailabilitySet,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [additionalHours, setAdditionalHours] = useState<
    { from: string; to: string }[]
  >([]);

  const timeSlots = ["9am - 5 pm", "6am - 9am", "2pm - 6pm", "From 6pm"];

  const handleDone = () => {
    onSelectAvailabilitySet({
      selectedDays,
      selectedTimeSlots,
      additionalHours,
    });
    setIsAvailabilityModalOpen(false);
  };

  const handleAddAdditionalHours = () => {
    setAdditionalHours([...additionalHours, { from: "", to: "" }]);
  };

  const handleRemoveAdditionalHours = (index: number) => {
    setAdditionalHours(additionalHours.filter((_, i) => i !== index));
  };

  const handleAdditionalHoursChange = (
    index: number,
    field: "from" | "to",
    value: string,
  ) => {
    const updatedHours = [...additionalHours];
    updatedHours[index][field] = value;
    setAdditionalHours(updatedHours);
  };

  return (
    <Dialog
      open={isAvailabilityModalOpen}
      onClose={() => setIsAvailabilityModalOpen(false)}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
          padding: "24px",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "left", pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Set your availability
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Set your availability to increase your discoverability. When you're
          available, people are more likely to discover and reach out to you.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography
            variant="body1"
            fontWeight="medium"
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ mb: 2 }}
          >
            <CalendarTodayIcon fontSize="small" /> Select days
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {days.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <Button
                  key={day}
                  variant="contained"
                  onClick={() =>
                    setSelectedDays((prev) =>
                      isSelected
                        ? prev.filter((d) => d !== day)
                        : [...prev, day],
                    )
                  }
                  sx={{
                    minWidth: "7vh",
                    height: "7vh",
                    borderRadius: "50%",
                    backgroundColor: isSelected
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.WHITE_COLOR,
                    color: isSelected ? COLORS.WHITE_COLOR : COLORS.BLACK_COLOR,
                    border: `1px solid ${isSelected ? COLORS.PRIMARY_COLOR : "#E0E0E0"}`,
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                  }}
                >
                  {day}
                </Button>
              );
            })}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {timeSlots.map((slot) => (
              <Chip
                key={slot}
                label={slot}
                onClick={() =>
                  setSelectedTimeSlots((prev) =>
                    prev.includes(slot)
                      ? prev.filter((s) => s !== slot)
                      : [...prev, slot],
                  )
                }
                sx={{
                  borderRadius: "24px",
                  backgroundColor: selectedTimeSlots.includes(slot)
                    ? COLORS.BG_LIGHT_ORANGE_COLOR
                    : COLORS.WHITE_COLOR,

                  border: `1px solid ${
                    selectedTimeSlots.includes(slot) ? COLORS.PRIMARY_COLOR : ""
                  }`,
                }}
              />
            ))}
          </Box>
        </Box>

        {additionalHours.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" fontWeight="medium">
              Additional hours
            </Typography>
            {additionalHours.map((hour, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <TextField
                  type="text"
                  placeholder="From"
                  value={hour.from}
                  onChange={(e) =>
                    handleAdditionalHoursChange(index, "from", e.target.value)
                  }
                  sx={{ width: "50%" }}
                />
                <TextField
                  type="text"
                  placeholder="To"
                  value={hour.to}
                  onChange={(e) =>
                    handleAdditionalHoursChange(index, "to", e.target.value)
                  }
                  sx={{ width: "50%" }}
                />
                <IconButton onClick={() => handleRemoveAdditionalHours(index)}>
                  <RemoveCircleOutlineIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#FF9800",
            cursor: "pointer",
            mt: 2,
          }}
          onClick={handleAddAdditionalHours}
        >
          <PlusIcon />
          <Typography variant="body2">Add additional hours</Typography>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ pt: 2, mb: 2 }}>
        <Button variant="primary" onClick={handleDone}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilitySetModal;
