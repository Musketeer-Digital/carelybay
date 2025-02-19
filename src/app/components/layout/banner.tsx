import { Box, Typography } from "@mui/material";
import { LogoType } from "./logotype";
export default function Banner() {
  return (
    <Box>
      {/* Logo and Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          paddingTop: 2,
          paddingLeft: 4,
        }}
      >
        <LogoType />
      </Box>
    </Box>
  );
}
