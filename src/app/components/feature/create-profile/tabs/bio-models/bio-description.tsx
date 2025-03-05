"use client";

import * as React from "react";
import { TextField } from "@mui/material";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";

interface ProfileBioDescriptionProps {
  isBioDescriptionModelOpen: boolean;
  setIsDescriptionBioModelOpen: (open: boolean) => void;
  profileBioDescription: string;
  setProfileBioDescription: (description: string) => void;
}

const ProfileBioDescription: React.FC<ProfileBioDescriptionProps> = ({
  isBioDescriptionModelOpen,
  setIsDescriptionBioModelOpen,
  profileBioDescription,
  setProfileBioDescription,
}) => {
  return (
    <CustomDialog
      open={isBioDescriptionModelOpen}
      onClose={() => setIsDescriptionBioModelOpen(false)}
      title="Profile Bio"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => setIsDescriptionBioModelOpen(false)}
          sx={{
            px: 3,
            borderRadius: 20,
            height: 40,
            color: COLORS.WHITE_COLOR,
          }}
        >
          Save
        </CustomButton>
      }
    >
      <TextField
        fullWidth
        multiline
        minRows={10}
        variant="outlined"
        value={profileBioDescription}
        onChange={(e) => setProfileBioDescription(e.target.value)}
        placeholder="Write about yourself..."
        sx={{
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
    </CustomDialog>
  );
};

export default ProfileBioDescription;
