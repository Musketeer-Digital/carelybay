// components/InformationCard.tsx
"use client";

import { Box, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface InformationCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const InformationCard = ({
  label,
  value,
  icon = <PersonIcon />,
}: InformationCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px 20px",
        borderRadius: "20px",
        background: "#E0E8EF",
        minWidth: 150,
      }}
    >
      <Typography variant="caption" sx={{ color: "#666", fontWeight: 500 }}>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
        {icon}
        <Typography fontSize={14} fontWeight={600}>
          {value}
        </Typography>
      </Stack>
    </Box>
  );
};

export default InformationCard;
