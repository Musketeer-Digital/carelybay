import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
  "Sign up",
];

const ProgressBarSegment = styled(Box)<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    width: 120,
    height: 8,
    borderRadius: 8,
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.divider,
    transition: "background-color 0.17s",
  }),
);

interface CustomizedSteppersProps {
  activeStep: number;
  sx?: object;
}

const CustomizedSteppers: FC<CustomizedSteppersProps> = ({
  activeStep,
  ...rest
}) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={4} {...rest}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        {steps.map((_, index) => (
          <ProgressBarSegment key={index} isActive={index <= activeStep} />
        ))}
      </Box>
    </Stack>
  );
};

export default CustomizedSteppers;
