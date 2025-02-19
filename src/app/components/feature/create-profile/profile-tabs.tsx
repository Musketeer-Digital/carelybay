"use client";

import React, { useRef } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import ProfileBio from "./tabs/bio";
import Services from "./tabs/services";
import Availability from "./tabs/availability";
import Documents from "./tabs/documents";

const ProfileTabs = () => {
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const handleTabClick = (index: number) => {
    sectionRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box>
      <Tabs
        value={false}
        onChange={(e, newValue) => handleTabClick(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {[
          "Personal Info",
          "Services & Experience",
          "Availability & Rates",
          "Documents",
        ].map((label, index) => (
          <Tab
            key={index}
            label={label}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 3, p: 2, bgcolor: "#F7F7F7", borderRadius: 2 }}>
        <div ref={sectionRefs[0]}>
          <ProfileBio />
        </div>
        <div ref={sectionRefs[1]}>
          <Services />
        </div>
        <div ref={sectionRefs[2]}>
          <Availability />
        </div>
        <div ref={sectionRefs[3]}>
          <Documents />
        </div>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
