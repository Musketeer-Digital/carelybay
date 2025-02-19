"use client";

import { useState } from "react";
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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface Service {
  label: string;
  icon: JSX.Element;
}

interface ServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  servicesList: Service[];
  selectedServices: any[];
  toggleService: Function;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  servicesList,
  selectedServices,
  toggleService,
}) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth>
      <DialogTitle>
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
        <Typography variant="body2" color="textSecondary">
          Care for up to 2 children
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {servicesList.map((service) => {
            const isSelected = selectedServices.some(
              (servie) => servie.label === service.label,
            );
            return (
              <Grid item key={service.label} xs={6} sm={4} md={3}>
                <Button
                  variant={isSelected ? "contained" : "outlined"}
                  color={isSelected ? "warning" : "primary"}
                  fullWidth
                  onClick={() => toggleService(service)}
                  startIcon={service.icon}
                >
                  {service.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
          Need a different category?{" "}
          <a href="#" style={{ color: "#FF9800", fontWeight: "bold" }}>
            Let us know
          </a>
        </Typography>
      </DialogContent>

      <Divider sx={{ mt: 2 }} />

      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <div>
          <Typography variant="subtitle2" color="textPrimary">
            <b>{selectedServices.length}/8 selected</b>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Your selection will appear here
          </Typography>
        </div>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setIsModalOpen(false)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceModal;
