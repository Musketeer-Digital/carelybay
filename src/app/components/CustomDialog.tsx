"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footerButtons?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    maxHeight: "100dvh",
    width: "100%", // Ensure full width on mobile
    margin: 0, // Remove default MUI margin
  },
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    flex: 1,
    overflowY: "auto",
  },
}));

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  children,
  footerButtons,
  maxWidth = "sm",
  fullWidth = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          position: isMobile ? "fixed" : "relative",
          bottom: isMobile ? 0 : "auto",
          left: isMobile ? 0 : "auto",
          right: isMobile ? 0 : "auto",
          mx: isMobile ? "auto" : undefined,
          width: isMobile ? "100%" : undefined,
          borderRadius: isMobile ? "16px 16px 0 0" : "15px",
          boxShadow: isMobile ? "0 -4px 16px rgba(0,0,0,0.1)" : undefined,
          maxHeight: isMobile ? "85vh" : "calc(100vh - 64px)",
          mt: isMobile ? "auto" : undefined,
        },
      }}
    >
      {title && (
        <DialogTitle>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent dividers>{children}</DialogContent>

      {footerButtons && <DialogActions>{footerButtons}</DialogActions>}
    </StyledDialog>
  );
};

export default CustomDialog;
