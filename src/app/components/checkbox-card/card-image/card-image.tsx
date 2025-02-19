import React from "react";
import { Box } from "@mui/material";

export default function CardImage({
  image,
  isSelected,
}: {
  image: React.ReactNode;
  isSelected: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: 2,
        backgroundColor: isSelected ? "common.white" : "#D9D9D9",
        border: "1px",
        borderColor: "#D9D9D9",
        borderStyle: "solid",
      }}
    >
      {image}
    </Box>
  );
}
