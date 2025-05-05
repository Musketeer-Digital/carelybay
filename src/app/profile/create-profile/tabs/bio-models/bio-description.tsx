"use client";

import * as React from "react";
import { TextField } from "@mui/material";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";

interface ProfileBioDescriptionProps {
  isBioDescriptionModelOpen: boolean;
  setIsDescriptionBioModelOpen: (open: boolean) => void;
  storedProfileBio: string;
  handleUpdateProfileField: Function;
}

const ProfileBioDescription: React.FC<ProfileBioDescriptionProps> = ({
  isBioDescriptionModelOpen,
  setIsDescriptionBioModelOpen,
  storedProfileBio,
  handleUpdateProfileField,
}) => {
  const [profileBioDescription, setProfileBioDescription] =
    React.useState<string>(
      "Write something punchy ex: Experienced and Caring Nanny for Infants and Toddlers...",
    );

  React.useEffect(() => {
    if (storedProfileBio) {
      setProfileBioDescription(storedProfileBio);
    }
  }, [isBioDescriptionModelOpen]);

  return (
    <CustomDialog
      open={isBioDescriptionModelOpen}
      onClose={() => setIsDescriptionBioModelOpen(false)}
      title="Profile Bio"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            setIsDescriptionBioModelOpen(false);
            handleUpdateProfileField("bio", profileBioDescription);
          }}
          sx={{
            px: 3,

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
