"use client";
import { Box, Typography } from "@mui/material";
import JobCard from "./job-card";
import { useEffect, useState } from "react";
import { getJobs } from "@/utils/api/findJob";
import { FullscreenSpinner } from "../components/CustomSpinner";

interface IJobListProps {
  filters: {
    location: string;
    dateRange: any;
    selectedServices: string[];
  };
  activeTab: number;
}

const JobList = ({ filters, activeTab }: IJobListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    fetchJobPosts();
  }, [filters, activeTab]);

  const fetchJobPosts = async () => {
    setIsLoading(true);
    try {
      let type = "all";
      if (activeTab === 1) type = "best-match";
      if (activeTab === 2) type = "saved";
      const jobs = await getJobs();
      setJobPosts(jobs);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      {isLoading && <FullscreenSpinner />}

      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {jobPosts.length} Results
      </Typography>
      {jobPosts.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </Box>
  );
};

export default JobList;
