"use client";

import { Box, Chip } from "@mui/material";
import { COLORS } from "@/constants/colors";

interface TimeSlotSelectorProps {
  slots: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
}

const TimeSlotSelector = ({
  slots,
  selected,
  onChange,
}: TimeSlotSelectorProps) => {
  const toggleSlot = (slot: string) => {
    const updated = selected.includes(slot)
      ? selected.filter((s) => s !== slot)
      : [...selected, slot];
    onChange(updated);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        mt: 1,
      }}
    >
      {slots.map((slot) => {
        const isSelected = selected.includes(slot);
        return (
          <Chip
            key={slot}
            label={slot}
            onClick={() => toggleSlot(slot)}
            sx={{
              borderRadius: "24px",
              backgroundColor: isSelected
                ? COLORS.BG_LIGHT_ORANGE_COLOR
                : COLORS.WHITE_COLOR,
              border: `1px solid ${
                isSelected ? COLORS.PRIMARY_COLOR : "transparent"
              }`,
              cursor: "pointer",
            }}
          />
        );
      })}
    </Box>
  );
};

export default TimeSlotSelector;
