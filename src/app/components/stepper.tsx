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
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
];

export default function CustomizedSteppers({ step }: { step: number }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}></Step>
        ))}
      </Stepper>
    </Stack>
  );
}
