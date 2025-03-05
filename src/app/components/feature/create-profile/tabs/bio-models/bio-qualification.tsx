"use client";

import CustomButton from "@/app/components/CustomButton";
import CustomDialog from "@/app/components/CustomDialog";
import { COLORS } from "@/constants/colors";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
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
    <CustomDialog
      open={isQualificationModalOpen}
      onClose={() => setIsQualificationModalOpen(false)}
      title="Qualification"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => setIsQualificationModalOpen(false)}
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
                    ? COLORS.BG_LIGHT_GREY_COLOR
                    : "transparent",
                "&:hover": { backgroundColor: COLORS.BG_LIGHT_GREY_COLOR },
              }}
            >
              <ListItemText
                primary={qualification}
                primaryTypographyProps={{
                  fontWeight:
                    selectedQualification === qualification ? "bold" : "normal",
                }}
              />
              <Radio
                checked={selectedQualification === qualification}
                sx={{
                  color:
                    selectedQualification === qualification ? "black" : "gray",
                  "&.Mui-checked": { color: "black" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CustomDialog>
  );
};

export default QualificationModal;
