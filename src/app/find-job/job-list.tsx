"use client";
import { Box, Typography } from "@mui/material";
import JobCard from "./job-card";

const JobList = () => {
  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        124 Results
      </Typography>
      {Array.from({ length: 3 }).map((_, index) => (
        <JobCard key={index} />
      ))}
    </Box>
  );
};

export default JobList;
