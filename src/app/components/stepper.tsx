import * as React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
  "Sign up",
];

const ProgressBarSegment = styled(Box)<{ active: boolean }>(
  ({ theme, active }) => ({
    width: 120,
    height: 8,
    borderRadius: 8,
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.divider,
    transition: "background-color 0.17s",
  }),
);

export default function CustomizedSteppers({
  activeStep,
}: {
  activeStep: number;
}) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        {steps.map((_, index) => (
          <ProgressBarSegment key={index} active={index <= activeStep} />
        ))}
      </Box>
    </Stack>
  );
}
