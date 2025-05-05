"use client";

import { Button, Box } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { days } from "./signup-marketing-panel/create-profile/profile-options";

interface DaySelectorProps {
  selectedDays: string[];
  onChange: (updatedDays: string[]) => void;
  buttonSize?: { xs?: number; sm?: number; md?: number };
  justifyContent?: string;
}

const DaySelector = ({
  selectedDays,
  onChange,
  buttonSize = { xs: 30, sm: 50, md: 62 },
  justifyContent,
}: DaySelectorProps) => {
  const handleToggle = (day: string) => {
    const isSelected = selectedDays.includes(day);
    const updated = isSelected
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    onChange(updated);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justifyContent ? justifyContent : "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {days.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <Button
            key={day}
            variant="contained"
            onClick={() => handleToggle(day)}
            sx={{
              minWidth: "0 !important",
              width: buttonSize,
              height: buttonSize,
              fontSize: {
                xs: "12px",
                sm: "13px",
                md: "14px",
              },
              borderRadius: "50%",
              backgroundColor: isSelected
                ? COLORS.PRIMARY_COLOR
                : COLORS.WHITE_COLOR,
              color: isSelected ? COLORS.WHITE_COLOR : COLORS.BLACK_COLOR,
              border: `1px solid ${
                isSelected ? COLORS.PRIMARY_COLOR : "#E0E0E0"
              }`,
              fontWeight: "500",
              textTransform: "none",
            }}
          >
            {day}
          </Button>
        );
      })}
    </Box>
  );
};

export default DaySelector;
