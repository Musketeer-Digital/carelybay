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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface ServiceAgeModalProps {
  isAgeModalOpen: boolean;
  setIsAgeModalOpen: (open: boolean) => void;
  toggleAgeGroup: Function;
}

const AgeModal: React.FC<ServiceAgeModalProps> = ({
  isAgeModalOpen,
  setIsAgeModalOpen,
}) => {
  const [ageValue, setAgeValue] = useState<number>(10);
  const [childrenCount, setChildrenCount] = useState<number>(2);

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

        {/* Age Slider */}
        <div style={{ padding: "16px 0" }}>
          <Slider
            min={0}
            max={99}
            value={ageValue}
            onChange={(_, newValue) => setAgeValue(newValue as number)}
            valueLabelDisplay="on"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            <span>0</span>
            <span style={{ fontWeight: "bold" }}>{ageValue} years</span>
            <span>99</span>
          </div>
        </div>

        {/* Children Counter */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Typography variant="body1" fontWeight="medium">
            I’m comfortable caring for
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            <IconButton
              color="warning"
              onClick={() => setChildrenCount(Math.max(1, childrenCount - 1))}
              disabled={childrenCount === 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              {childrenCount}
            </Typography>
            <IconButton
              color="warning"
              onClick={() => setChildrenCount(childrenCount + 1)}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Typography variant="body2" color="textSecondary">
            Children
          </Typography>
        </div>
      </DialogContent>
      <Divider />
      {/* Next Button Stuck at Bottom */}
      <DialogActions>
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={() => setIsAgeModalOpen(false)}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgeModal;
