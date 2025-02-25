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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

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
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
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
                    bgcolor: isSelected ? "#FF9800" : "#f5f5f5",
                    color: isSelected ? "white" : "#616161",
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

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 3 }}
        >
          <b>
            {selectedAdditionalInfo.length}/{additionalInfoOptions.length}{" "}
            selected
          </b>
          <br />
          Your selection will appear here
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() => setIsAdditionalInfoModalOpen(false)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceAdditionalInfoModal;
