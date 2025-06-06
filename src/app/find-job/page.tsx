"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import JobList from "./job-list";
import FilterSidebar from "./filter-sidebar";
import FindJobTabs from "./find-job-tabs";
import { useState } from "react";
import dayjs from "dayjs";

const FindJob = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);

  const [filters, setFilters] = useState({
    location: "",
    dateRange: [null, null],
    selectedServices: [],
  });

  return (
    <Box
      sx={{
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5 },
        pt: 2,
      }}
    >
      <FindJobTabs activeTab={tab} onChange={setTab} />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2].includes(tab) && (
          <>
            <Box sx={{ flex: 3 }}>
              <JobList filters={filters} activeTab={tab} />
            </Box>
            {!isMobile && (
              <Box sx={{ flex: 1 }}>
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FindJob;
