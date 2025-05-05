"use client";

import { Box, Typography, TextField, Stack } from "@mui/material";
import CustomButton from "@/app/components/CustomButton";
import { useState } from "react";

interface IApplyJob {
  setApplyClicked: Function;
}
const ApplyJob = ({ setApplyClicked }: IApplyJob) => {
  const [message, setMessage] = useState("Type your message...");

  return (
    <Box mt={4} mb={5}>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 600,
          mb: 1,
        }}
      >
        Your Message
      </Typography>

      <TextField
        fullWidth
        multiline
        minRows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Stack direction="row" spacing={2} mt={2}>
        <CustomButton
          variant="primary"
          sx={{
            height: 40,
            px: 4,
          }}
        >
          Apply
        </CustomButton>
        <CustomButton
          variant="outlined"
          sx={{
            px: 4,
            height: 40,
          }}
          onClick={() => setApplyClicked(false)}
        >
          Cancel
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default ApplyJob;
