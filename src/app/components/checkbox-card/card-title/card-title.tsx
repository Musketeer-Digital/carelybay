import React from "react";
import { Box, Typography } from "@mui/material";

export default function CardTitle({ title }: { title: string }) {
  return (
    <Box sx={{ display: "flex", mt: 1 }}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
}
