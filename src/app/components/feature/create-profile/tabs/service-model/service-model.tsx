"use client";

import { Box, Typography, Grid, Chip, IconButton } from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { servicesList } from "../../profile-options";
import React from "react";

interface ServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedServices: any[];
  toggleService: Function;
  handleUpdateProfileField: Function;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedServices,
  toggleService,
  handleUpdateProfileField,
}) => {
  return (
    <CustomDialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Add your Services provided"
      maxWidth="sm"
      footerButtons={
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            <b>
              {selectedServices.length}/{servicesList.length} selected
            </b>
            <br />
            Your selection will appear here
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomButton
              variant="contained"
              onClick={() => {
                setIsModalOpen(false);
              }}
              sx={{
                px: 3,

                height: 40,
              }}
            >
              Cancel
            </CustomButton>

            <CustomButton
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                handleUpdateProfileField("services", selectedServices);
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
        </Box>
      }
    >
      <Grid container spacing={1}>
        {servicesList.map((service) => {
          const isSelected = selectedServices.some((s) => s.id === service.id);
          return (
            <Grid item key={service.id}>
              <Chip
                label={service.label}
                icon={
                  isSelected ? (
                    <IconButton
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: isSelected ? COLORS.WHITE_COLOR : "white",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: isSelected
                            ? "#FFC4A1"
                            : COLORS.BG_LIGHT_GREY_COLOR,
                        },
                      }}
                    >
                      {service.icon}
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                    >
                      <span
                        style={{
                          color: COLORS.BLACK_COLOR,
                        }}
                      >
                        {service.icon}
                      </span>
                    </IconButton>
                  )
                }
                onClick={() => toggleService(service)}
                sx={{
                  height: "45px",
                  fontSize: "14px",
                  padding: "8px 12px",
                  borderRadius: "24px",
                  backgroundColor: isSelected
                    ? COLORS.BG_LIGHT_ORANGE_COLOR
                    : COLORS.WHITE_COLOR,
                  border: isSelected
                    ? `1px solid ${COLORS.PRIMARY_COLOR}`
                    : `1px solid ${COLORS.BORDER_COLOR}`,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "#FFC4A1"
                      : COLORS.BG_LIGHT_GREY_COLOR,
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 3,
          backgroundColor: "#F7F5EC",
          borderRadius: "20px",
          display: "flex",
          height: "40px",
          padding: "4px 16px",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "fit-content",
        }}
      >
        <Typography variant="body2">
          Need a different category?{" "}
          <span
            style={{
              color: COLORS.GREY_COLOR,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Let us know
          </span>
        </Typography>
      </Box>
    </CustomDialog>
  );
};

export default ServiceModal;
