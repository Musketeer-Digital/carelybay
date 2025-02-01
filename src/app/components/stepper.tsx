import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 6px)",
    right: "calc(50% + 6px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "rgba(255, 104, 23, 1)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "rgba(255, 104, 23, 1)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 8,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: "8px",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(228, 228, 228, 1)",
    }),
  },
}));

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
  "Sign up",
];

export default function CustomizedSteppers({ step }: { step: number }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorlibConnector />}
        sx={{ gap: "0px" }}
      >
        {steps.map((label) => (
          <Step key={label} sx={{ minWidth: "10px", px: 0 }}></Step>
        ))}
      </Stepper>
    </Stack>
  );
}
