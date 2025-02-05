import { Box, Typography } from "@mui/material";

export default function Banner() {
  return (
    <Box>
      {/* Logo and Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          gap: 1,
          margin: "1em",
          marginLeft: "2em",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "1000", color: "rgba(253, 104, 25, 1)" }}
        >
          C
        </Typography>
        <Typography variant="h5">Logotype</Typography>
      </Box>
    </Box>
  );
}
