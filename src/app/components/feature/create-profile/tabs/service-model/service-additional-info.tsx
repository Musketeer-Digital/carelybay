"use client";

import { Typography, Grid, IconButton, Divider, Box } from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { additionalInfoOptions } from "../../profile-options";
import React from "react";
import { IAdditionalInfo } from "@/utils/profileUtils";

interface ServiceAdditionalInfoModalProps {
  isAdditionalInfoModalOpen: boolean;
  setIsAdditionalInfoModalOpen: (open: boolean) => void;
  selectedAdditionalInfo: IAdditionalInfo[];
  toggleAdditionalInfo: (info: IAdditionalInfo) => void;
  handleUpdateProfileField: Function;
}

const ServiceAdditionalInfoModal: React.FC<ServiceAdditionalInfoModalProps> = ({
  isAdditionalInfoModalOpen,
  setIsAdditionalInfoModalOpen,
  selectedAdditionalInfo,
  toggleAdditionalInfo,
  handleUpdateProfileField,
}) => {
  return (
    <CustomDialog
      open={isAdditionalInfoModalOpen}
      onClose={() => setIsAdditionalInfoModalOpen(false)}
      title="Select additional information"
      maxWidth="sm"
      footerButtons={
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            <b>
              {selectedAdditionalInfo.length}/{additionalInfoOptions.length}
              selected
            </b>
            <br />
            Your selection will appear here
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <CustomButton
                variant="primary"
                onClick={() => {
                  setIsAdditionalInfoModalOpen(false);
                  handleUpdateProfileField(
                    "additionalInfo",
                    selectedAdditionalInfo,
                  );
                }}
                sx={{ px: 3, height: 40 }}
              >
                Save
              </CustomButton>
            </Box>
          </Box>
        </Box>
      }
    >
      <Typography variant="body2" color="textSecondary" gutterBottom>
        This information you share will be used across the platform
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {additionalInfoOptions.map((item) => {
          const isSelected = selectedAdditionalInfo.some(
            (i) => i.id === item.id,
          );
          return (
            <Grid
              item
              key={item.id}
              xs={6}
              sm={3}
              textAlign="center"
              sx={{ cursor: "pointer" }}
              onClick={() => toggleAdditionalInfo(item)}
            >
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: `1px solid #CDCDCD`,
                  borderRadius: "50%",
                  bgcolor: isSelected
                    ? COLORS.PRIMARY_COLOR
                    : COLORS.WHITE_COLOR,
                  color: isSelected ? COLORS.WHITE_COLOR : COLORS.BLACK_COLOR,
                  boxShadow: isSelected ? 3 : 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: COLORS.PRIMARY_COLOR,
                    color: COLORS.WHITE_COLOR,
                    "& svg": { filter: "invert(1)" },
                  },
                  "& svg": { filter: isSelected ? "invert(1)" : "invert(0)" },
                }}
              >
                {item.icon}
              </IconButton>

              <Typography
                variant="caption"
                fontWeight={500}
                display="block"
                sx={{ mt: 1 }}
              >
                {item.label}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </CustomDialog>
  );
};

export default ServiceAdditionalInfoModal;
