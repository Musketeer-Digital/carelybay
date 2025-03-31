"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { BabySitterIcon } from "@/app/components/icons/babysitter-icon";
import { ElderAgeIcon } from "@/app/components/icons/elderage-icon";
import { COLORS } from "@/constants/colors";
import { useProfileStore } from "@/store/profileSlice";

interface BabySitterModalProps {
  isBabysitterModalOpen: boolean;
  setIsBabysitterModalOpen: (open: boolean) => void;
  handleUpdateProfileField: Function;
}

const options = [
  { label: "Babysitter", icon: <BabySitterIcon /> },
  { label: "Nanny", icon: <ElderAgeIcon /> },
  { label: "School Pickups", icon: <BabySitterIcon /> },
];

const BabySitterModal: React.FC<BabySitterModalProps> = ({
  isBabysitterModalOpen,
  setIsBabysitterModalOpen,
  handleUpdateProfileField,
}) => {
  const [childCarerType, setChildCarerType] = useState<string>("Babysitter");

  const handleSelect = (option: string) => {
    setChildCarerType(option);
  };

  const { userProfile } = useProfileStore();

  useEffect(() => {
    if (userProfile?.servicesExperience) {
      setChildCarerType(
        userProfile.servicesExperience.childCarerType || childCarerType,
      );
    }
  }, [userProfile]);

  return (
    <CustomDialog
      open={isBabysitterModalOpen}
      onClose={() => setIsBabysitterModalOpen(false)}
      title={"What kind of child carer are you?"}
      maxWidth="sm"
      footerButtons={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            px: 2,
          }}
        >
          <CustomButton
            variant="contained"
            onClick={() => {
              setIsBabysitterModalOpen(false);
            }}
            sx={{
              px: 3,

              height: 40,
              mr: 2,
            }}
          >
            Cancel
          </CustomButton>

          <CustomButton
            variant="primary"
            onClick={() => {
              setIsBabysitterModalOpen(false);
              handleUpdateProfileField("childCarerType", childCarerType);
            }}
            sx={{
              px: 3,

              height: 40,
              color: COLORS.WHITE_COLOR,
            }}
          >
            Save
          </CustomButton>
        </Box>
      }
    >
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 16, color: "#777", mt: 1 }}>
          Add your child care
        </Typography>
      </Box>
      <List sx={{ width: "100%", mt: 1, p: 2 }}>
        {options.map((option) => (
          <ListItem
            key={option.label}
            disablePadding
            sx={{
              mb: 1,
              borderRadius: "12px",
              bgcolor:
                childCarerType === option.label ? "#E0E8EF" : "transparent",
              border:
                childCarerType === option.label
                  ? "1px solid #E0E8EF"
                  : "1px solid transparent",
              display: "flex",
              alignItems: "center",
              px: 2,
              height: "60px",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() => handleSelect(option.label)}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>{option.icon}</ListItemIcon>
            <ListItemText
              primary={option.label}
              primaryTypographyProps={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#000",
              }}
            />
            {childCarerType === option.label && <Checkbox checked />}
          </ListItem>
        ))}
      </List>
    </CustomDialog>
  );
};

export default BabySitterModal;
