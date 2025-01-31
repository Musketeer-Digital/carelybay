import React from "react";
import { Box, Typography } from "@mui/material";
import ChooseRoleCards from "./choose-role-cards";

export default function ChooseRole() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography fontWeight={"700"} fontSize={"34px"} lineHeight={"46px"}>
        Create your Carelybay account
      </Typography>
      <Typography fontWeight={"400"} fontSize={"16px"} lineHeight={"24px"}>
        Choose your role
      </Typography>
      <ChooseRoleCards />
    </Box>
  );
}
