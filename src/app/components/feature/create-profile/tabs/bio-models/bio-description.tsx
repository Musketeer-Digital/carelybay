"use client";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

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
    <Modal
      open={isBioDescriptionModelOpen}
      onClose={() => setIsDescriptionBioModelOpen(false)}
      aria-labelledby="bio-description-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "600px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginBottom: "16px" }}
        >
          Profile Bio
        </Typography>

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
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: "100%", marginTop: "16px", textAlign: "right" }}>
          <Button
            variant="primary"
            color="primary"
            onClick={() => setIsDescriptionBioModelOpen(false)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileBioDescription;
