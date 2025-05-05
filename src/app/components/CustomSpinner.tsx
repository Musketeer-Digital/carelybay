import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const FullscreenSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.22)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={"4rem"} color="primary" />
    </Box>
  );
};

export const CustomSpinner: React.FC = () => {
  return <CircularProgress color="primary" />;
};
