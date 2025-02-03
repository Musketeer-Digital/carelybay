import { Box, Typography } from "@mui/material";
import React from "react";

interface PageHeaderProps {
  heading: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

export default function PageHeader({
  heading = "<Heading required>",
  subtitle = "<Subtitle required>",
}: PageHeaderProps) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4" fontWeight="bold" marginBottom={1}>
        {heading}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
