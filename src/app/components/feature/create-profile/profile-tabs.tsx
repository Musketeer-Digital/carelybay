"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Tabs, Tab, Divider, Typography } from "@mui/material";
import ProfileBio from "./tabs/bio";
import Services from "./tabs/services";
import Availability from "./tabs/availability";
import Documents from "./tabs/documents";

const tabLabels = [
  "Personal Info",
  "Services & Experience",
  "Availability & Rates",
  "Documents",
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = tabLabels.map(() => useRef<HTMLDivElement>(null));

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    sectionRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentTab = 0;
      sectionRefs.forEach((ref, index) => {
        if (ref.current) {
          const { top } = ref.current.getBoundingClientRect();
          if (top < 100) currentTab = index;
        }
      });
      setActiveTab(currentTab);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => handleTabClick(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: "1px solid #E0E0E0",
          ".MuiTabs-indicator": {
            backgroundColor: "#FF6600",
            height: "3px",
          },
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={index}
            label={
              <Typography
                sx={{
                  fontWeight: activeTab === index ? "bold" : "normal",
                  color: activeTab === index ? "#FF6600" : "#666",
                  textTransform: "none",
                }}
              >
                {label}
              </Typography>
            }
            onClick={() => handleTabClick(index)}
            sx={{
              minWidth: "auto",
              padding: "12px 16px",
              "&:hover": { color: "#FF6600" },
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 3, p: 2, backgroundColor: "#F9F9F9", borderRadius: 2 }}>
        <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
          {sectionRefs.map((ref, index) => (
            <React.Fragment key={index}>
              <div ref={ref}>
                {index === 0 && <ProfileBio />}
                {index === 1 && <Services />}
                {index === 2 && <Availability />}
                {index === 3 && <Documents />}
              </div>
              {index < sectionRefs.length - 1 && <Divider sx={{ my: 3 }} />}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
