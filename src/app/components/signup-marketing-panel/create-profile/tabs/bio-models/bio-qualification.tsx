"use client";

import CustomButton from "@/app/components/CustomButton";
import CustomDialog from "@/app/components/CustomDialog";
import { COLORS } from "@/constants/colors";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { qualificationsList } from "../../profile-options";
import { CheckedIcon } from "@/app/components/icons/checked-icon";

interface ProfileBioQualificationModalProps {
  isQualificationModalOpen: boolean;
  setIsQualificationModalOpen: (open: boolean) => void;
  selectedQualification: string;
  setSelectedQualification: (qualification: string) => void;
  handleUpdateProfileField: Function;
}

const QualificationModal: React.FC<ProfileBioQualificationModalProps> = ({
  isQualificationModalOpen,
  setIsQualificationModalOpen,
  selectedQualification,
  setSelectedQualification,
  handleUpdateProfileField,
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
          onClick={() => {
            setIsQualificationModalOpen(false);
            handleUpdateProfileField("qualification", selectedQualification);
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
      <List
        sx={{
          width: "100%",
          maxHeight: "450px",
          overflowY: "auto",
          borderRadius: "8px",
          p: 3,
        }}
      >
        {qualificationsList.map((qualification) => (
          <ListItem key={qualification} disablePadding>
            <ListItemButton
              selected={selectedQualification === qualification}
              onClick={() => setSelectedQualification(qualification)}
              sx={{
                mb: 1.5,
                borderRadius: "16px",
                border: "0.5px solid #D9D9D9",
                backgroundColor:
                  selectedQualification === qualification
                    ? "#E0E8EF!important"
                    : "transparent",
                boxShadow:
                  selectedQualification === qualification
                    ? "0px 1px 2px 0px rgba(0, 0, 0, 0.04)"
                    : "none",
                padding: "12px",
                display: "flex",
                justifyContent: "space-between",
                "&:hover": { backgroundColor: "#E0E8EF" },
              }}
            >
              <ListItemText
                primary={qualification}
                primaryTypographyProps={{
                  fontWeight:
                    selectedQualification === qualification ? "bold" : "normal",
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  border: "1px solid #D9DADB",
                  borderRadius: "50%",
                  background: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedQualification === qualification && <CheckedIcon />}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CustomDialog>
  );
};

export default QualificationModal;
