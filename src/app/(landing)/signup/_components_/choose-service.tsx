import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChooseServiceCards from "./choose-service-cards";
import PageHeader from "@/app/components/layout/page-header";

export default function ChooseService() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PageHeader
          heading="What service do you offer?"
          subtitle="A message will be shown indicating that the user will have the opportunity to customize each service later."
        />
        <ChooseServiceCards />
      </Box>
    </Box>
  );
}
