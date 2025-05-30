import React from "react";
import { Box, SxProps, Typography } from "@mui/material";

interface UserNotificationMessageProps {
  icon: string;
  message: string;
  sx?: SxProps;
}

const UserNotificationMessage: React.FC<UserNotificationMessageProps> = ({
  icon,
  message,
  sx = {},
}) => {
  if (!icon || !message) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1em",
        height: "48px",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "rgba(243, 243, 243, 1)",
            borderRadius: "50%",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px" }}>{icon}</Typography>
        </Box>
        <Typography variant="body1" fontWeight="600">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserNotificationMessage;
