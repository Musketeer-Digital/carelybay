"use client";

import { Box, Typography, TextField, Stack } from "@mui/material";
import CustomButton from "@/app/components/CustomButton";
import { useState } from "react";
import { applyToJob } from "@/utils/api/appliedJob";
import { useJobStore } from "@/store/jobSlice";
import { useUserStore } from "@/store/userSlice";
import mongoose from "mongoose";
import { showToast } from "@/utils/toast";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";

interface IApplyJob {
  setApplyClicked: (val: boolean) => void;
  isApplied: boolean;
  existingMessage: string;
  checkExistingApplication: () => void;
  applyClicked: boolean;
}

const ApplyJob = ({
  setApplyClicked,
  isApplied,
  existingMessage,
  checkExistingApplication,
  applyClicked,
}: IApplyJob) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedJob } = useJobStore();
  const { user } = useUserStore();

  const handleApply = async () => {
    if (!selectedJob?._id || !user?._id) return;

    setLoading(true);
    try {
      await applyToJob({
        jobId: new mongoose.Types.ObjectId(selectedJob._id),
        userId: new mongoose.Types.ObjectId(user._id),
        message,
      });
      showToast("Successfully applied to the job!");
      setApplyClicked(false);
      checkExistingApplication();
    } catch (error) {
      showToast("Failed to apply for the job. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (isApplied) {
    return (
      <>
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Your Message
        </Typography>
        <Box
          mt={2}
          mb={5}
          sx={{
            border: "1px solid #E5E7EB",
            borderRadius: "5px",
            p: 2,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              sx={{
                flex: "1 0 0",
                color: "#4D4D4D",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "26px",
                mb: 2,
              }}
            >
              {existingMessage}
            </Typography>
          </Stack>
        </Box>
      </>
    );
  }

  if (applyClicked) {
    return (
      <Box mt={4} mb={5}>
        {loading && <FullscreenSpinner />}
        <Typography sx={{ fontSize: "24px", fontWeight: 600, mb: 1 }}>
          Your Message
        </Typography>

        <TextField
          placeholder="Type your message..."
          fullWidth
          multiline
          minRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Stack direction="row" spacing={2} mt={2}>
          <CustomButton
            variant="primary"
            sx={{ height: 40, px: 4 }}
            onClick={handleApply}
            disabled={loading}
          >
            Apply
          </CustomButton>
          <CustomButton
            variant="outlined"
            sx={{ px: 4, height: 40 }}
            onClick={() => setApplyClicked(false)}
            disabled={loading}
          >
            Cancel
          </CustomButton>
        </Stack>
      </Box>
    );
  }
  return "";
};

export default ApplyJob;
