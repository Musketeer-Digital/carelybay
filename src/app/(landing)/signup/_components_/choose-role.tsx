import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import PageHeader from "@/components/layout/page-header";
import ChooseRoleCards from "./choose-role-cards";

export default function ChooseRole() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <PageHeader
        heading={
          isMobile
            ? "Choose your main service"
            : "Create your Carelybay account"
        }
        subtitle="A message will be shown indicating that the user will have the opportunity to customize service."
      />
      <ChooseRoleCards />
    </Box>
  );
}
