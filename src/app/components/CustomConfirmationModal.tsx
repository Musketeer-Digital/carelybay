import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "./CustomButton";
import { COLORS } from "@/constants/colors";

interface CustomConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const CustomConfirmationModal: React.FC<CustomConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="custom-confirmation-dialog-title"
    >
      <DialogTitle id="custom-confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          sx={{
            px: 3,

            height: 40,
          }}
          onClick={onClose}
          variant="outlined"
        >
          {cancelText}
        </CustomButton>
        <CustomButton
          sx={{
            px: 3,

            height: 40,
            color: COLORS.WHITE_COLOR,
          }}
          onClick={onConfirm}
          variant="primary"
          autoFocus
        >
          {confirmText}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmationModal;
