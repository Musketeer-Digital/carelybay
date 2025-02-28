"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";

interface AdditionalInfo {
  label: string;
  icon: JSX.Element;
}

interface ServiceAdditionalInfoModalProps {
  isAdditionalInfoModalOpen: boolean;
  setIsAdditionalInfoModalOpen: (open: boolean) => void;
  additionalInfoOptions: AdditionalInfo[];
  selectedAdditionalInfo: AdditionalInfo[];
  toggleAdditionalInfo: (info: AdditionalInfo) => void;
}

const ServiceAdditionalInfoModal: React.FC<ServiceAdditionalInfoModalProps> = ({
  isAdditionalInfoModalOpen,
  setIsAdditionalInfoModalOpen,
  additionalInfoOptions,
  selectedAdditionalInfo,
  toggleAdditionalInfo,
}) => {
  return (
    <Dialog
      open={isAdditionalInfoModalOpen}
      onClose={() => setIsAdditionalInfoModalOpen(false)}
      fullWidth
    >
      <DialogTitle>
        Select additional information
        <IconButton
          aria-label="close"
          onClick={() => setIsAdditionalInfoModalOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          This information you share will be used across the platform
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {additionalInfoOptions.map((item) => {
            const isSelected = selectedAdditionalInfo.some(
              (i) => i.label === item.label,
            );
            return (
              <Grid item key={item.label} xs={6} sm={3} textAlign="center">
                <IconButton
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: isSelected
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.WHITE_COLOR,
                    color: isSelected ? COLORS.WHITE_COLOR : COLORS.BLACK_COLOR,
                    boxShadow: isSelected ? 3 : 0,
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => toggleAdditionalInfo(item)}
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
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ ml: 2, mb: 2, mt: 2 }}
        >
          <b>
            {selectedAdditionalInfo.length}/{additionalInfoOptions.length}{" "}
            selected
          </b>
          <br />
          Your selection will appear here
        </Typography>
        <Button
          variant="primary"
          onClick={() => setIsAdditionalInfoModalOpen(false)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceAdditionalInfoModal;
