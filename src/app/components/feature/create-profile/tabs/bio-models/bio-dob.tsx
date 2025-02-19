"use client";

import CustomButton from "@/app/components/CustomButton";
import { Modal, Select, Typography, Box, MenuItem } from "@mui/material";

interface ProfileBioDOBSModalProps {
  isDOBModalOpen: boolean;
  setIsDOBModalOpen: (open: boolean) => void;
  selectedDOB: { month: string; day: string; year: string };
  handleSelectDOB: (key: string, value: string) => void;
  months: string[];
  days: number[];
  years: number[];
}

const DOBSModal: React.FC<ProfileBioDOBSModalProps> = ({
  isDOBModalOpen,
  setIsDOBModalOpen,
  selectedDOB,
  handleSelectDOB,
  months,
  days,
  years,
}) => {
  return (
    <Modal
      open={isDOBModalOpen}
      onClose={() => setIsDOBModalOpen(false)}
      aria-labelledby="dob-modal-title"
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Date of Birth
        </Typography>

        {/* DOB Select Inputs */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Select
            fullWidth
            displayEmpty
            value={selectedDOB.month || ""}
            onChange={(event) =>
              handleSelectDOB("month", event.target.value as string)
            }
          >
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
          >
            {days.map((day: any) => (
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
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          <CustomButton onClick={() => setIsDOBModalOpen(false)}>
            Save
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DOBSModal;
