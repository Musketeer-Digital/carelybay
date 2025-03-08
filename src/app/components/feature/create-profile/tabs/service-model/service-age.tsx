"use client";

import { useState } from "react";
import { Box, Typography, Slider, IconButton } from "@mui/material";
import { PlusIcon } from "@/app/components/icons/plus-icon";
import { MinusIcon } from "@/app/components/icons/minus-icon";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { COLORS } from "@/constants/colors";
import { Height } from "@mui/icons-material";

interface ServiceAgeModalProps {
  isAgeModalOpen: boolean;
  setIsAgeModalOpen: (open: boolean) => void;
  toggleAgeGroup: Function;
}

const AgeModal: React.FC<ServiceAgeModalProps> = ({
  isAgeModalOpen,
  setIsAgeModalOpen,
  toggleAgeGroup,
}) => {
  const [ageValue, setAgeValue] = useState<number>(10);
  const [children, setChildren] = useState<number>(2);

  return (
    <CustomDialog
      open={isAgeModalOpen}
      onClose={() => setIsAgeModalOpen(false)}
      title="Age"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            toggleAgeGroup({ ageValue, children });
            setIsAgeModalOpen(false);
          }}
          sx={{ px: 3, borderRadius: 20, height: 40 }}
        >
          Save
        </CustomButton>
      }
    >
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Select all that apply
      </Typography>

      <Box sx={{ padding: "16px 0" }}>
        <Slider
          min={0}
          max={99}
          value={ageValue}
          onChange={(_, newValue) => setAgeValue(newValue as number)}
          valueLabelDisplay="on"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">0</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {ageValue} years
          </Typography>
          <Typography variant="body2">99</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            color: "#222",
            fontFamily: "Poppins",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
          variant="body1"
        >
          I’m comfortable caring for
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <IconButton
            sx={{
              bgcolor: COLORS.PRIMARY_COLOR,
              height: 35,
              width: 35,
              color: COLORS.WHITE_COLOR,
              "&:hover": {
                bgcolor: COLORS.PRIMARY_COLOR,
                color: COLORS.WHITE_COLOR,
              },
            }}
            onClick={() => setChildren(Math.max(1, children - 1))}
          >
            <MinusIcon color="white" />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            {children}
          </Typography>
          <IconButton
            sx={{
              bgcolor: COLORS.PRIMARY_COLOR,
              height: 35,
              width: 35,
              color: COLORS.WHITE_COLOR,
              "&:hover": {
                bgcolor: COLORS.PRIMARY_COLOR,
                color: COLORS.WHITE_COLOR,
              },
            }}
            onClick={() => setChildren(children + 1)}
          >
            <PlusIcon color="white" />
          </IconButton>
        </Box>
        <Typography sx={{ ml: 4 }} variant="body2" color="textSecondary">
          Children
        </Typography>
      </Box>
    </CustomDialog>
  );
};

export default AgeModal;
