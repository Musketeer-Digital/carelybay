"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import JobList from "./job-list";
import FilterSidebar from "./filter-sidebar";
import FindJobTabs from "./find-job-tabs";
import { useState } from "react";

const FindJob = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);

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
        {tab === 0 && (
          <>
            <Box sx={{ flex: 3 }}>
              <JobList />
            </Box>
            {!isMobile && (
              <Box sx={{ flex: 1 }}>
                <FilterSidebar />
              </Box>
            )}
          </>
        )}
        {tab === 1 && (
          <>
            <Box sx={{ flex: 3 }}>
              <JobList />
            </Box>
            {!isMobile && (
              <Box sx={{ flex: 1 }}>
                <FilterSidebar />
              </Box>
            )}
          </>
        )}
        {tab === 2 && (
          <>
            <Box sx={{ flex: 3 }}>
              <JobList />
            </Box>
            {!isMobile && (
              <Box sx={{ flex: 1 }}>
                <FilterSidebar />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FindJob;
