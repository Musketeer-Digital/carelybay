import { Box, Typography } from "@mui/material";
export default function PageHeader({
  heading = "<Heading required>",
  subtitle = "<Subtitle required>",
}) {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" marginBottom={1}>
        {heading}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
