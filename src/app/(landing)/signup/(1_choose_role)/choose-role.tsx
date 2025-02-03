import React from "react";
import { Box } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";
import ChooseRoleCards from "./choose-role-cards";

export default function ChooseRole() {
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
        heading="Create your Carelybay account"
        subtitle="Choose your role"
      />
      <ChooseRoleCards />
    </Box>
  );
}
