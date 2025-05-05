"use client";

import { useState } from "react";
import {
  Typography,
  Chip,
  Box,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { COLORS } from "@/constants/colors";
import { PlusIcon } from "@/app/components/icons/plus-icon";
import { CalendarIcon } from "@/app/components/icons/calendar-icon";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { days, timeSlots } from "../../profile-options";
import { DeleteIcon } from "@/app/components/icons/delete-icon";
import DaySelector from "@/app/components/DaySelector";
import TimeSlotSelector from "@/app/components/TimeSlotSelector";

interface AvailabilitySetModalProps {
  isAvailabilityModalOpen: boolean;
  setIsAvailabilityModalOpen: (open: boolean) => void;
  onSelectAvailabilitySet: Function;
  handleUpdateProfileField: Function;
}

const AvailabilitySetModal: React.FC<AvailabilitySetModalProps> = ({
  isAvailabilityModalOpen,
  setIsAvailabilityModalOpen,
  onSelectAvailabilitySet,
  handleUpdateProfileField,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [additionalHours, setAdditionalHours] = useState<
    { from: string; to: string }[]
  >([]);

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
    <CustomDialog
      open={isAvailabilityModalOpen}
      onClose={() => setIsAvailabilityModalOpen(false)}
      title="Set your availability"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            handleDone();
            handleUpdateProfileField("availability", {
              days: selectedDays,
              timeSlots: selectedTimeSlots,
              additionalHours: additionalHours,
            });
          }}
          sx={{ px: 3, height: 40 }}
        >
          Save
        </CustomButton>
      }
    >
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
          <CalendarIcon /> Select days
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <TimeSlotSelector
          slots={timeSlots}
          selected={selectedTimeSlots}
          onChange={setSelectedTimeSlots}
        />
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
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            mt: 4,
          }}
          onClick={handleAddAdditionalHours}
        >
          <PlusIcon />
          <Typography variant="body2">Add additional hours</Typography>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default AvailabilitySetModal;
