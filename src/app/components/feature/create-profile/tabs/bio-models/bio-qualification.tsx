"use client";

import {
  Modal,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Button,
  Divider,
} from "@mui/material";

interface ProfileBioQualificationModalProps {
  isQualificationModalOpen: boolean;
  setIsQualificationModalOpen: (open: boolean) => void;
  qualifications: string[];
  selectedQualification: string;
  setSelectedQualification: (qualification: string) => void;
}

const QualificationModal: React.FC<ProfileBioQualificationModalProps> = ({
  isQualificationModalOpen,
  setIsQualificationModalOpen,
  qualifications,
  selectedQualification,
  setSelectedQualification,
}) => {
  return (
    <Modal
      open={isQualificationModalOpen}
      onClose={() => setIsQualificationModalOpen(false)}
      aria-labelledby="qualification-modal-title"
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
          Qualification
        </Typography>

        <List
          sx={{
            width: "100%",
            maxHeight: "350px",
            overflowY: "auto",
            borderRadius: "8px",
          }}
        >
          {qualifications.map((qualification) => (
            <ListItem key={qualification} disablePadding>
              <ListItemButton
                selected={selectedQualification === qualification}
                onClick={() => setSelectedQualification(qualification)}
                sx={{
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor:
                    selectedQualification === qualification
                      ? "#F5F5F5"
                      : "transparent",
                  "&:hover": { backgroundColor: "#F5F5F5" },
                }}
              >
                <ListItemText
                  primary={qualification}
                  primaryTypographyProps={{
                    fontWeight:
                      selectedQualification === qualification
                        ? "bold"
                        : "normal",
                  }}
                />
                <Radio
                  checked={selectedQualification === qualification}
                  sx={{
                    color:
                      selectedQualification === qualification
                        ? "black"
                        : "gray",
                    "&.Mui-checked": { color: "black" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <Box sx={{ width: "100%", marginTop: "16px", textAlign: "right" }}>
          <Button
            variant="primary"
            onClick={() => setIsQualificationModalOpen(false)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default QualificationModal;
