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
  const [generalRate, setGeneralRate] = useState<string>("");
  const [rates, setRates] = useState<any>({
    nightRate: "",
    holidayRate: "",
    additionalChildRate: "",
  });

  const handleRateChange = (key: string, value: string) => {
    setRates((prev: any) => ({ ...prev, [key]: value }));
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
          sx={{ px: 3, height: 40 }}
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
              type="text"
              value={generalRate}
              onChange={(e) => setGeneralRate(e.target.value)}
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
          {
            key: "nightRate",
            label: "Night rate",
            tooltip: "Applies to hours worked outside of 9:00 AM – 5:00 PM.",
          },
          {
            key: "holidayRate",
            label: "Holidays rate",
            tooltip:
              "Applies to hours worked during Australian public holidays.",
          },
          {
            key: "additionalChildRate",
            label: "Additional child rate",
            tooltip:
              "The hourly rate that includes care for additional child(ren).",
          },
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
              <Tooltip title={item.tooltip} arrow>
                <span style={{ display: "inline-flex", cursor: "pointer" }}>
                  <InfoIcon />
                </span>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">$</Typography>
              <TextField
                type="text"
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
