import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChooseServiceCards from "./choose-service-cards";
import PageHeader from "@/app/components/layout/page-header";

interface ChooseServiceProps {
  prevStep: () => void;
}

export const InteractiveHeader = ({ prevStep }: ChooseServiceProps) => {
  return (
    <Typography
      fontWeight={"700"}
      fontSize={"34px"}
      lineHeight={"46px"}
      onClick={prevStep}
      sx={{ cursor: "pointer" }}
    >
      &lt; Choose your main service
    </Typography>
  );
};

export default function ChooseService({ prevStep }: ChooseServiceProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <PageHeader
          heading={
            isMobile ? (
              "Choose your main service"
            ) : (
              <InteractiveHeader prevStep={prevStep} />
            )
          }
          subtitle="Pick your service for the signup process"
        />
        <ChooseServiceCards />
      </Box>
    </Box>
  );
}
