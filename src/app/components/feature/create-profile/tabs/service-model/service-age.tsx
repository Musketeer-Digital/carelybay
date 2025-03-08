"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Slider,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { PlusIcon } from "@/app/components/icons/plus-icon";
import { MinusIcon } from "@/app/components/icons/minus-icon";

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
    <Dialog
      open={isAgeModalOpen}
      onClose={() => setIsAgeModalOpen(false)}
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Age
        </Typography>
      </DialogTitle>
      <DialogContent>
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

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body1" fontWeight="medium">
            I’m comfortable caring for
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 1,
            }}
          >
            <IconButton
              color="warning"
              onClick={() => setChildren(Math.max(1, children - 1))}
              disabled={children === 1}
            >
              <MinusIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              {children}
            </Typography>
            <IconButton
              color="warning"
              onClick={() => setChildren(children + 1)}
            >
              <PlusIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            Children
          </Typography>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="primary"
          onClick={() => {
            toggleAgeGroup({ ageValue, children });
            setIsAgeModalOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgeModal;
