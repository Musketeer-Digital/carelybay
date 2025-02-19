"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import CustomButton from "@/app/components/CustomButton";

interface AvailabilityRatesModalProps {
  isRatesModalOpen: boolean;
  setIsRatesModalOpen: (open: boolean) => void;
}

const AvailabilityRatesModal: React.FC<AvailabilityRatesModalProps> = ({
  isRatesModalOpen,
  setIsRatesModalOpen,
}) => {
  const [generalRate, setGeneralRate] = useState<number>(500);
  const [rates, setRates] = useState<any>({
    nightRate: 20,
    holidayRate: 20,
    additionalChildRate: 10,
  });

  const handleRateChange = (key: string, value: string) => {
    setRates((prev: any) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <Dialog
      open={isRatesModalOpen}
      onClose={() => setIsRatesModalOpen(false)}
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Set your rate
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Set prices on boarding service
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* General Rate Section */}
        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarTodayIcon fontSize="small" /> What is your rate for booking?
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            General rate
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Typography variant="body1" fontWeight="bold">
              $
            </Typography>
            <TextField
              type="number"
              value={generalRate}
              onChange={(e) => setGeneralRate(Number(e.target.value))}
              variant="outlined"
              size="small"
              style={{ width: "80px" }}
            />
            <Typography variant="body2" color="textSecondary">
              / hour
            </Typography>
          </div>
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Additional Rates Section */}
        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarTodayIcon fontSize="small" /> Additional rates
        </Typography>

        {[
          { key: "nightRate", label: "Night rate" },
          { key: "holidayRate", label: "Holidays rate" },
          { key: "additionalChildRate", label: "Additional child rate" },
        ].map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Typography variant="body1" fontWeight="bold">
                +
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
              <Tooltip title="Extra charge applies">
                <InfoIcon
                  fontSize="small"
                  style={{ color: "gray", cursor: "pointer" }}
                />
              </Tooltip>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Typography variant="body1" fontWeight="bold">
                $
              </Typography>
              <TextField
                type="number"
                value={rates[item.key]}
                onChange={(e) => handleRateChange(item.key, e.target.value)}
                variant="outlined"
                size="small"
                style={{ width: "80px" }}
              />
              <Typography variant="body2" color="textSecondary">
                / hour
              </Typography>
            </div>
          </div>
        ))}
      </DialogContent>

      {/* Done Button */}
      <DialogActions>
        <CustomButton
          variant="contained"
          color="warning"
          onClick={() => setIsRatesModalOpen(false)}
        >
          Done
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilityRatesModal;
