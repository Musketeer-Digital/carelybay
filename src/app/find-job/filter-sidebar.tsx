"use client";

import { Box, Typography, Chip, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { TextField } from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { COLORS } from "@/constants/colors";

interface FilterSidebarProps {
  filters: {
    location: string;
    dateRange: any;
    selectedServices: string[];
  };
  setFilters: (val: any) => void;
}

const allServices = ["All", "Nanny", "Babysitter", "School Pickups"];

const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [showServices, setShowServices] = useState(true);

  const [localDateRange, setLocalDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [localServices, setLocalServices] = useState<string[]>([]);
  const [localLocation, setLocalLocation] = useState(filters.location);

  useEffect(() => {
    // If filters.dateRange is in the old format, convert it
    if (
      Array.isArray(filters.dateRange) &&
      filters.dateRange.length === 2 &&
      (filters.dateRange[0] || filters.dateRange[1])
    ) {
      setLocalDateRange([
        {
          startDate: filters.dateRange[0],
          endDate: filters.dateRange[1],
          key: "selection",
        },
      ]);
    } else if (
      Array.isArray(filters.dateRange) &&
      filters.dateRange[0] &&
      filters.dateRange[0].startDate
    ) {
      setLocalDateRange(filters.dateRange);
    } else {
      setLocalDateRange([
        {
          startDate: null,
          endDate: null,
          key: "selection",
        },
      ]);
    }
    setLocalServices(filters.selectedServices);
    setLocalLocation(filters.location);
  }, [filters]);

  const currentMonthLabel =
    localDateRange[0].startDate && localDateRange[0].endDate
      ? `${format(localDateRange[0].startDate, "MMM dd, yyyy")} - ${format(localDateRange[0].endDate, "MMM dd, yyyy")}`
      : "Date Range";

  const toggleService = (service: string) => {
    setLocalServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const applyFilters = () => {
    setFilters((prev: any) => ({
      ...prev,
      location: localLocation,
      dateRange: localDateRange,
      selectedServices: localServices,
    }));
  };

  const resetFilters = () => {
    const defaultFilters = {
      location: "",
      dateRange: [
        {
          startDate: null,
          endDate: null,
          key: "selection",
        },
      ],
      selectedServices: [],
    };

    setLocalLocation(defaultFilters.location);
    setLocalDateRange(defaultFilters.dateRange);
    setLocalServices(defaultFilters.selectedServices);
    setFilters(defaultFilters);
  };

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

        <TextField
          fullWidth
          variant="outlined"
          value={localLocation}
          onChange={(e) => setLocalLocation(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "6px",
            },
          }}
        />

        {/* Date Range */}
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
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setLocalDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={localDateRange}
              rangeColors={[COLORS.PRIMARY_COLOR]}
              minDate={new Date()}
              style={{ borderRadius: "15px", border: "1px solid #F1F1F1" }}
            />
          </Box>
        )}

        {/* Services */}
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
            {allServices.map((service) => {
              const isSelected = localServices.includes(service);
              return (
                <Chip
                  key={service}
                  label={service}
                  variant={isSelected ? "filled" : "outlined"}
                  onClick={() => toggleService(service)}
                  sx={
                    isSelected
                      ? {
                          backgroundColor: "#FF6B00",
                          color: "#fff",
                          fontWeight: 500,
                        }
                      : undefined
                  }
                />
              );
            })}
          </Stack>
        )}

        {/* Buttons */}
        <CustomButton
          fullWidth
          variant="primary"
          sx={{ mb: 1 }}
          onClick={applyFilters}
        >
          Apply filter
        </CustomButton>
        <CustomButton fullWidth variant="outlined" onClick={resetFilters}>
          Reset filter
        </CustomButton>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
