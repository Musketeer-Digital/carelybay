import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Banner() {
  return (
    <>
      {/* Logo and Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          gap: "1em",
          margin: "1em",
          marginLeft: "2em",
        }}
      >
        <Image
          src="https://placehold.co/28x28"
          alt="Logo"
          width={28}
          height={28}
          unoptimized
        />
        <Typography variant="h5">Logotype</Typography>
      </Box>
    </>
  );
}
