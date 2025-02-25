"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";

interface AvailabilitySetModalProps {
  isAvailabilityModalOpen: boolean;
  setIsAvailabilityModalOpen: (open: boolean) => void;
}

const AvailabilitySetModal: React.FC<AvailabilitySetModalProps> = ({
  isAvailabilityModalOpen,
  setIsAvailabilityModalOpen,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "2:00 PM - 4:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  return (
    <Dialog
      open={isAvailabilityModalOpen}
      onClose={() => setIsAvailabilityModalOpen(false)}
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Set your availability
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Set your availability to increase your discoverability. When you’re
          available, people are more likely to discover and reach out to you.
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Select Days Section */}
        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarTodayIcon fontSize="small" /> Select days
        </Typography>
        <ToggleButtonGroup
          value={selectedDays}
          onChange={(_, newSelection) => setSelectedDays(newSelection)}
          fullWidth
          sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
        >
          {days.map((day) => (
            <ToggleButton key={day} value={day} sx={{ borderRadius: "50px" }}>
              {day}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Time Slots Section */}
        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ mt: 3 }}
        >
          <CalendarTodayIcon fontSize="small" /> Select time slots
        </Typography>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}
        >
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
              color={selectedTimeSlots.includes(slot) ? "warning" : "default"}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#FF9800",
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          <AddIcon />
          <Typography variant="body2">Add additional hours</Typography>
        </div>

        <Divider sx={{ my: 3 }} />

        {/* Day Offs Section */}
        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarTodayIcon fontSize="small" /> Day - offs
        </Typography>
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
          Select non-working days
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setIsAvailabilityModalOpen(false)}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilitySetModal;
