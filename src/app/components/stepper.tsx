import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIcon,
  Box,
} from "@mui/material";

const HiddenConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.horizontal}`]: {
    display: "none",
  },
}));

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
];

export const StepLineIcon = ({ active }: { active: boolean }) => {
  return (
    <Box
      sx={{
        width: 120,
        height: 8,
        backgroundColor: active ? "primary.main" : "divider",
        borderRadius: 1,
      }}
    />
  );
};

export default function CustomizedSteppers({
  activeStep,
}: {
  activeStep: number;
}) {
  console.log("active step", activeStep);
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<HiddenConnector />}
      >
        {steps.map((label, i) => (
          <Step key={label} sx={{ px: 0.5, py: 2 }}>
            <StepIcon icon={<StepLineIcon active={activeStep === i} />} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
