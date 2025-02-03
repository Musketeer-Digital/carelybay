import * as React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box, MobileStepper } from "@mui/material";

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
  "Sign up",
];

export const StepLineIcon = ({ active }: { active: boolean }) => {
  return (
    <Box
      sx={{
        maxWidth: 120,
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
      <MobileStepper
        variant="dots"
        position="static"
        activeStep={activeStep}
        steps={3}
        nextButton={null}
        backButton={null}
      ></MobileStepper>
    </Stack>
  );
}
