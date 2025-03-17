"use client";

import { useState } from "react";
import { Typography, TextField, Tooltip, Divider, Box } from "@mui/material";
import { InfoIcon } from "@/app/components/icons/info-icon";
import { CalendarIcon } from "@/app/components/icons/calendar-icon";
import CustomDialog from "@/app/components/CustomDialog";
import CustomButton from "@/app/components/CustomButton";
import { PlusIcon } from "@/app/components/icons/plus-icon";

interface AvailabilityRatesModalProps {
  isRatesModalOpen: boolean;
  setIsRatesModalOpen: (open: boolean) => void;
  handleRatesSelection: Function;
  handleUpdateProfileField: Function;
}

const AvailabilityRatesModal: React.FC<AvailabilityRatesModalProps> = ({
  isRatesModalOpen,
  setIsRatesModalOpen,
  handleRatesSelection,
  handleUpdateProfileField,
}) => {
  const [generalRate, setGeneralRate] = useState<number>(0);
  const [rates, setRates] = useState<any>({
    nightRate: 0,
    holidayRate: 0,
    additionalChildRate: 0,
  });

  const handleRateChange = (key: string, value: string) => {
    setRates((prev: any) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <CustomDialog
      open={isRatesModalOpen}
      onClose={() => setIsRatesModalOpen(false)}
      title="Set your rate"
      maxWidth="sm"
      footerButtons={
        <CustomButton
          variant="primary"
          onClick={() => {
            setIsRatesModalOpen(false);
            handleRatesSelection({ generalRate, rates });
            handleUpdateProfileField("rates", { generalRate, rates });
          }}
          sx={{ px: 3, borderRadius: 20, height: 40 }}
        >
          Done
        </CustomButton>
      }
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Set prices on boarding service
        </Typography>

        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ mt: 2 }}
        >
          <CalendarIcon /> What is your rate for booking?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography sx={{ pl: 4 }} variant="body2" color="textSecondary">
            General rate
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">$</Typography>
            <TextField
              type="number"
              value={generalRate}
              onChange={(e) => setGeneralRate(Number(e.target.value))}
              variant="outlined"
              size="small"
              sx={{ width: "80px" }}
            />
            <Typography variant="body2" color="textSecondary">
              / hour
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="body1"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarIcon /> Additional rates
        </Typography>

        {[
          { key: "nightRate", label: "Night rate" },
          { key: "holidayRate", label: "Holidays rate" },
          { key: "additionalChildRate", label: "Additional child rate" },
        ].map((item) => (
          <Box
            key={item.key}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              pl: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                <PlusIcon />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
              <Tooltip title="Extra charge applies">
                <InfoIcon />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">$</Typography>
              <TextField
                type="number"
                value={rates[item.key]}
                onChange={(e) => handleRateChange(item.key, e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: "80px" }}
              />
              <Typography variant="body2" color="textSecondary">
                / hour
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CustomDialog>
  );
};

export default AvailabilityRatesModal;
