import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function PageHeader({
  heading = "<Heading required>",
  subtitle = "<Subtitle required>",
}) {
  return (
    <Box>
      {/* Logo and Name */}
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="https://placehold.co/28x28"
          alt="Logo"
          width={28}
          height={28}
          unoptimized
        />
        <Typography variant="h5">Logotype</Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold" marginBottom={1}>
        {heading}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
