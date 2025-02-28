"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import { COLORS } from "@/constants/colors";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i,
);

interface ProfileBioDOBSModalProps {
  isDOBModalOpen: boolean;
  setIsDOBModalOpen: (open: boolean) => void;
  selectedDOB: { month: string; day: string; year: string };
  handleSelectDOB: (key: string, value: string) => void;
}

const DOBSModal: React.FC<ProfileBioDOBSModalProps> = ({
  isDOBModalOpen,
  setIsDOBModalOpen,
  selectedDOB,
  handleSelectDOB,
}) => {
  return (
    <Modal
      open={isDOBModalOpen}
      onClose={() => setIsDOBModalOpen(false)}
      aria-labelledby="dob-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "420px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Date of the Birth
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 4,
            marginBottom: 5,
            width: "100%",
          }}
        >
          <Select
            fullWidth
            displayEmpty
            value={selectedDOB.month || ""}
            onChange={(event) =>
              handleSelectDOB("month", event.target.value as string)
            }
            sx={{
              borderRadius: "8px",
              backgroundColor: COLORS.BG_LIGHT_GREY_COLOR,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="" disabled>
              MM
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            displayEmpty
            value={selectedDOB.day || ""}
            onChange={(event) =>
              handleSelectDOB("day", event.target.value as string)
            }
            sx={{
              borderRadius: "8px",
              backgroundColor: COLORS.BG_LIGHT_GREY_COLOR,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="" disabled>
              DD
            </MenuItem>
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            displayEmpty
            value={selectedDOB.year || ""}
            onChange={(event) =>
              handleSelectDOB("year", event.target.value as string)
            }
            sx={{
              borderRadius: "8px",
              backgroundColor: COLORS.BG_LIGHT_GREY_COLOR,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="" disabled>
              YYYY
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Divider />
        <Box sx={{ width: "100%", marginTop: "16px", textAlign: "right" }}>
          <Button variant="primary" onClick={() => setIsDOBModalOpen(false)}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DOBSModal;
