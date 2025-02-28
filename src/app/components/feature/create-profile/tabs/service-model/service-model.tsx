"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SchoolIcon from "@mui/icons-material/School";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { COLORS } from "@/constants/colors";

interface Service {
  label: string;
  icon: JSX.Element;
}

interface ServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedServices: any[];
  toggleService: Function;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedServices,
  toggleService,
}) => {
  const servicesList: Service[] = [
    { label: "Cooking/Meal preparation", icon: <LocalDiningIcon /> },
    { label: "Pick-up/Drop off", icon: <DirectionsCarIcon /> },
    { label: "Light housekeeping", icon: <HomeIcon /> },
    { label: "Activities (e.g swimming)", icon: <EmojiEmotionsIcon /> },
    { label: "Putting kids to bed", icon: <SchoolIcon /> },
    { label: "Homework help", icon: <SchoolIcon /> },
    { label: "Bathing", icon: <ChildCareIcon /> },
    { label: "Virtual Care", icon: <VideocamIcon /> },
  ];

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      maxWidth="sm"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: 3, padding: 2 } }}
    >
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        Add your Services provided
        <IconButton
          aria-label="close"
          onClick={() => setIsModalOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
          Care for up to 2 children
        </Typography>

        <Grid container spacing={1}>
          {servicesList.map((service) => {
            const isSelected = selectedServices.some(
              (s) => s.label === service.label,
            );
            return (
              <Grid item key={service.label}>
                <Chip
                  label={service.label}
                  icon={
                    <span style={{ color: COLORS.BLACK_COLOR }}>
                      {service.icon}
                    </span>
                  } // Fix icon color
                  onClick={() => toggleService(service)}
                  sx={{
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
            py: 1,
            px: 2,
            backgroundColor: COLORS.BG_LIGHT_GREY_COLOR,
            borderRadius: "12px",
            display: "inline-block",
          }}
        >
          <Typography variant="body2">
            Need a different category?{" "}
            <span
              style={{
                color: COLORS.PRIMARY_COLOR,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Let us know
            </span>
          </Typography>
        </Box>
      </DialogContent>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <DialogActions sx={{ justifyContent: "space-between", px: 4, py: 2 }}>
        <Box>
          <Typography variant="subtitle2">
            <b>{selectedServices.length}/8 selected</b>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Your selection will appear here
          </Typography>
        </Box>
        <Button variant="primary" onClick={() => setIsModalOpen(false)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceModal;
