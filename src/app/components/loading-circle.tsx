import React from "react";
import { Box, CircularProgress, CircularProgressProps } from "@mui/material";

interface LoadingCircleProps extends Omit<CircularProgressProps, "variant"> {
  /**
   * Whether to center the loading circle in its container
   * @default false
   */
  center?: boolean;

  /**
   * Size of the loading circle in pixels
   * @default 40
   */
  size?: number;

  /**
   * Color of the loading circle
   * @default 'primary'
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";

  /**
   * Thickness of the circle
   * @default 3.6
   */
  thickness?: number;
}

/**
 * A customizable loading circle component
 */
const LoadingCircle: React.FC<LoadingCircleProps> = ({
  center = false,
  size = 40,
  color = "primary",
  thickness = 3.6,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        ...(center && {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }),
      }}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
        {...props}
      />
    </Box>
  );
};

export default LoadingCircle;
