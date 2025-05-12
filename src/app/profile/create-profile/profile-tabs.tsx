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
const tabComponents = [ProfileBio, Services, Availability, Documents];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef(
    sectionIds.map(() => React.createRef<HTMLDivElement>()),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (index: number) => {
    const offset =
      (sectionRefs.current[index].current?.offsetTop || 0) -
      (containerRef.current?.offsetTop || 0);

    containerRef.current?.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsScrolling(true);
    window.history.pushState(null, "", `#${sectionIds[index]}`);
    scrollToSection(index);
    setTimeout(() => setIsScrolling(false), 500);
  };

  const handleScroll = () => {
    if (isScrolling || !containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    let currentTab = 0;

    sectionRefs.current.forEach((ref, index) => {
      if (ref.current && scrollTop >= ref.current.offsetTop - 100) {
        currentTab = index;
      }
    });

    setActiveTab(currentTab);
    window.history.replaceState(null, "", `#${sectionIds[currentTab]}`);
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const index = sectionIds.indexOf(hash);
    if (index !== -1) {
      setActiveTab(index);
      scrollToSection(index);
    }
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
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
            sx={{
              minWidth: "auto",
              padding: "12px 16px",
              "&:hover": { color: COLORS.PRIMARY_COLOR },
            }}
          />
        ))}
      </Tabs>

      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          mt: 3,
          backgroundColor: COLORS.WHITE_COLOR,
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          px: 2,
        }}
      >
        {tabComponents.map((Component, index) => (
          <React.Fragment key={index}>
            <div ref={sectionRefs.current[index]} id={sectionIds[index]}>
              <Component />
            </div>
            {index > 0 && index < sectionRefs.current.length - 1 && (
              <Divider sx={{ my: 3 }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileTabs;
