import { Box, SxProps, Typography } from "@mui/material";
import React from "react";

interface PageHeaderProps {
  heading: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  sx?: SxProps;
}

export default function PageHeader({
  heading = "<Heading required>",
  subtitle = "<Subtitle required>",
  ...rest
}: PageHeaderProps) {
  return (
    <Box {...rest}>
      <Typography variant="h4" fontWeight="bold" marginBottom={2}>
        {heading}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
