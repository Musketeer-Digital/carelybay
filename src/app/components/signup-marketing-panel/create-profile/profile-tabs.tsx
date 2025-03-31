"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Tabs, Tab, Divider, Typography } from "@mui/material";
import ProfileBio from "./tabs/bio";
import Services from "./tabs/services";
import Availability from "./tabs/availability";
import Documents from "./tabs/documents";
import { COLORS } from "@/constants/colors";

const tabLabels = [
  "Personal Info",
  "Services & Experience",
  "Availability & Rates",
  "Documents",
];

const sectionIds = ["personal-info", "services", "availability", "documents"];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = sectionIds.map(() => useRef<HTMLDivElement>(null));

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const sectionId = sectionIds[index];

    window.history.pushState(null, "", `#${sectionId}`);

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

      window.history.replaceState(null, "", `#${sectionIds[currentTab]}`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      const index = sectionIds.indexOf(sectionId);
      if (index !== -1) {
        setActiveTab(index);
        sectionRefs[index].current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => handleTabClick(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: `1px solid ${COLORS.BORDER_COLOR}`,
          ".MuiTabs-indicator": {
            backgroundColor: COLORS.PRIMARY_COLOR,
            height: "3px",
          },
        }}
        role="tablist"
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={index}
            label={
              <Typography
                sx={{
                  fontWeight: activeTab === index ? "bold" : "normal",
                  color:
                    activeTab === index
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.SECONDARY_TEXT_COLOR,
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
              "&:hover": { color: COLORS.PRIMARY_COLOR },
            }}
            role="tab"
            aria-selected={activeTab === index}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          mt: 3,
          backgroundColor: COLORS.WHITE_COLOR,
        }}
      >
        <Box sx={{ backgroundColor: COLORS.WHITE_COLOR }}>
          {sectionRefs.map((ref, index) => (
            <React.Fragment key={index}>
              <div ref={ref} id={sectionIds[index]}>
                {index === 0 && <ProfileBio />}
                {index === 1 && <Services />}
                {index === 2 && <Availability />}
                {index === 3 && <Documents />}
              </div>
              {index < sectionRefs.length - 1 && index !== 0 && (
                <Divider sx={{ my: 3 }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
