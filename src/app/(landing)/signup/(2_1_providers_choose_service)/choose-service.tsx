import React from "react";
import { Box, Typography } from "@mui/material";
import ChooseServiceCards from "./choose-service-cards";

interface ChooseServiceProps {
  prevStep: () => void;
}

export default function ChooseService({ prevStep }: ChooseServiceProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography
        fontWeight={"700"}
        fontSize={"34px"}
        lineHeight={"46px"}
        onClick={prevStep}
        sx={{ cursor: "pointer" }}
      >
        &lt; Choose your main service
      </Typography>
      <Typography fontWeight={"400"} fontSize={"16px"} lineHeight={"24px"}>
        Pick your service for the signup process.
      </Typography>
      <ChooseServiceCards />
    </Box>
  );
}
