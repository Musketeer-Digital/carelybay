"use client";

import { Box, Select, MenuItem } from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { useEffect, useState } from "react";

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
  storedDOB: { month: string; day: string; year: string };
  handleUpdateProfileField: Function;
}

const DOBSModal: React.FC<ProfileBioDOBSModalProps> = ({
  isDOBModalOpen,
  setIsDOBModalOpen,
  storedDOB,
  handleUpdateProfileField,
}) => {
  const [selectedDOB, setSelectedDOB] = useState<{
    month: string;
    day: string;
    year: string;
  }>({
    month: "",
    day: "",
    year: "",
  });

  useEffect(() => {
    if (storedDOB) {
      setSelectedDOB(storedDOB);
    }
  }, [isDOBModalOpen]);

  const handleSelectDOB = (key: string, value: string) => {
    setSelectedDOB((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CustomDialog
      open={isDOBModalOpen}
      onClose={() => setIsDOBModalOpen(false)}
      title="Date of Birth"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            setIsDOBModalOpen(false);
            handleUpdateProfileField(
              "dateOfBirth",
              new Date(
                `${selectedDOB.month} ${selectedDOB.day}, ${selectedDOB.year}`,
              ),
            );
          }}
          sx={{
            px: 3,

            height: 40,
            color: COLORS.WHITE_COLOR,
          }}
        >
          Save
        </CustomButton>
      }
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
          mb: 3,
          width: "100%",
        }}
      >
        <Select
          fullWidth
          displayEmpty
          value={selectedDOB.day || ""}
          onChange={(event) =>
            handleSelectDOB("day", event.target.value as string)
          }
          sx={{
            borderRadius: "8px",
            border: "1px solid #ADAEAF",
            textAlign: "center",
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
          value={selectedDOB.month || ""}
          onChange={(event) =>
            handleSelectDOB("month", event.target.value as string)
          }
          sx={{
            borderRadius: "8px",
            border: "1px solid #ADAEAF",
            textAlign: "center",
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
          value={selectedDOB.year || ""}
          onChange={(event) =>
            handleSelectDOB("year", event.target.value as string)
          }
          sx={{
            borderRadius: "8px",
            border: "1px solid #ADAEAF",
            textAlign: "center",
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
    </CustomDialog>
  );
};

export default DOBSModal;
