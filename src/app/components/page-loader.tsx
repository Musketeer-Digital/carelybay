import React from "react";
import { Box, Typography } from "@mui/material";
import LoadingCircle from "./loading-circle";

interface PageLoaderProps {
  /**
   * Optional loading message to display
   */
  message?: string;

  /**
   * Background color of the loader backdrop
   * @default 'rgba(255, 255, 255, 0.7)'
   */
  backdropColor?: string;

  /**
   * Size of the loading circle
   * @default 60
   */
  loaderSize?: number;

  /**
   * Color of the loading circle
   * @default 'primary'
   */
  loaderColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
}

/**
 * A full page loading overlay component
 */
const PageLoader: React.FC<PageLoaderProps> = ({
  message,
  backdropColor = "rgba(255, 255, 255, 0.7)",
  loaderSize = 60,
  loaderColor = "primary",
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backdropColor,
        zIndex: 9999,
      }}
    >
      <LoadingCircle size={loaderSize} color={loaderColor} />

      {message && (
        <Typography
          variant="h6"
          sx={{ mt: 2, textAlign: "center", maxWidth: "80%" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default PageLoader;
