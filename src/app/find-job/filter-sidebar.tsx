"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import dayjs, { Dayjs } from "dayjs";
import CustomButton from "../components/CustomButton";

const FilterSidebar = () => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs("2025-01-19"),
    dayjs("2025-01-22"),
  ]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showServices, setShowServices] = useState(true);

  const services = [
    { label: "All (100)", selected: false },
    { label: "Nanny (10)", selected: false },
    { label: "Babysitter (20)", selected: true },
    { label: "School Pickups (70)", selected: false },
  ];

  const currentMonthLabel = dateRange[0]?.format("MMM YYYY") || "Date Range";

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Filter
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: "15px",
          border: "1px solid #eee",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
          Location
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            px: 2,
            py: 1.2,
            mb: 2,
            fontSize: 14,
            fontWeight: 500,
            color: "#333",
          }}
        >
          MELBOURNE, VIC 3000
        </Box>

        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Date Range
        </Typography>

        <Box
          onClick={() => setShowCalendar(!showCalendar)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            mb: 1,
          }}
        >
          <Typography variant="body2">{currentMonthLabel}</Typography>
          <ExpandMoreIcon
            sx={{
              transform: showCalendar ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        </Box>

        {showCalendar && (
          <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                calendars={1}
                slotProps={{
                  actionBar: { actions: [] },
                }}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #F1F1F1",
                  borderRadius: "15px",
                }}
              />
            </LocalizationProvider>
          </Box>
        )}

        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Services
        </Typography>

        <Box
          onClick={() => setShowServices(!showServices)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            mb: 1,
          }}
        >
          <Typography variant="body2">For Child</Typography>
          <ExpandMoreIcon
            sx={{
              transform: showServices ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        </Box>

        {showServices && (
          <Stack direction="row" gap={1} flexWrap="wrap" mb={3}>
            {services.map((item) => (
              <Chip
                key={item.label}
                label={item.label}
                variant={item.selected ? "filled" : "outlined"}
                sx={
                  item.selected
                    ? {
                        backgroundColor: "#FF6B00",
                        color: "#fff",
                        fontWeight: 500,
                      }
                    : undefined
                }
              />
            ))}
          </Stack>
        )}

        <CustomButton fullWidth variant="primary" sx={{ mb: 1 }}>
          Apply filter
        </CustomButton>
        <CustomButton fullWidth variant="outlined">
          Reset filter
        </CustomButton>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
