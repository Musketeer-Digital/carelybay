import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";

const steps = [
  "DEFAULT",
  "Create your Carelybay account (select role)",
  "Choose your service",
  "Sign up",
];

const ProgressBarSegment = styled(Box)<{ isactive: boolean }>(
  ({ theme, isactive }) => ({
    width: 120,
    height: 8,
    borderRadius: 8,
    backgroundColor: isactive
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
          <ProgressBarSegment key={index} isactive={index <= activeStep} />
        ))}
      </Box>
    </Stack>
  );
};

export default CustomizedSteppers;
