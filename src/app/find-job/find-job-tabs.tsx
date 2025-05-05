"use client";

import { Tabs, Tab, Typography, Box } from "@mui/material";
import React from "react";

interface FindJobTabsProps {
  activeTab: number;
  onChange: (newTab: number) => void;
}

const tabLabels = ["All Job Posts", "Best Matches", "Saved Jobs"];

const FindJobTabs: React.FC<FindJobTabsProps> = ({ activeTab, onChange }) => {
  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, newTab) => onChange(newTab)}
        sx={{
          minHeight: 44,
          ".MuiTabs-indicator": {
            height: 3,
          },
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={index}
            label={
              <Typography
                sx={{
                  textTransform: "none",
                  fontWeight: activeTab === index ? "bold" : 500,
                  color: activeTab === index ? "#000" : "#555",
                  fontSize: "1rem",
                }}
              >
                {label}
                {label === "Best Matches" && (
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#F15A29",
                      color: "#fff",
                      fontSize: "0.7rem",
                      ml: 1,
                      px: "6px",
                      py: "1px",
                      borderRadius: "999px",
                    }}
                  >
                    90%+
                  </Box>
                )}
              </Typography>
            }
            disableRipple
            sx={{
              minHeight: 44,
              paddingX: 2,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default FindJobTabs;
