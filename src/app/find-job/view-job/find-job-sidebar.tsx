"use client";

import { Box, Typography, Avatar, Stack } from "@mui/material";
import { Star } from "@mui/icons-material";

const JobSidebar = () => {
  return (
    <Box
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: "20px",
        p: 3,
        width: "100%",
        backgroundColor: "#fff",
        background: "rgba(224, 232, 239, 0.2)",
        mt: 3,
      }}
    >
      <Stack direction="row" spacing={2} mb={2}>
        <Avatar src="/avatar.jpg" sx={{ width: 48, height: 48 }} />
      </Stack>
      <Box sx={{ mb: 2 }}>
        <Typography fontWeight={700} fontSize={14} mb={0.5}>
          About Family
        </Typography>
        <Typography fontSize={14}>Alanna Doe</Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={0.5}
        mb={2}
      >
        <Box>
          {[...Array(5)].map((_, i) => (
            <Star key={i} sx={{ color: "#FFB400", fontSize: 18 }} />
          ))}
        </Box>
        <Typography fontSize={13} color="text.secondary" ml={1}>
          5.0 (based on 3 reviews)
        </Typography>
      </Stack>

      <Typography fontSize={13} color="text.secondary" mb={2}>
        We are a family of three with one child, a 9-year-old in primary school.
        Our child enjoys reading, sports, and creative activities.
      </Typography>

      <Typography fontSize={13} mb={0.5}>
        • 1 Child
      </Typography>
      <Typography fontSize={13} mb={0.5}>
        • Age: Primary school age (7–12 Years)
      </Typography>
      <Typography fontSize={13}>• 1 Cat</Typography>
    </Box>
  );
};

export default JobSidebar;
