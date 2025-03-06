import React from "react";
import { Slider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TravelDistanceSliderProps {
  name: string;
  maxDistance: number;
  step: number;
}

export default function TravelDistanceSlider({
  name,
  maxDistance,
  step,
}: TravelDistanceSliderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={0}
      render={({ field }) => (
        <Slider
          {...field}
          step={step}
          min={0}
          max={maxDistance}
          sx={{
            pt: 4,
            pb: 4,
            "& .MuiSlider-thumb": {
              "&::before": {
                boxShadow: "none",
              },
              "&::after": {
                content: `"${field.value} Km"`,
                width: 48,
                position: "absolute",
                top: "48px",
                fontSize: 14,
                fontWeight: 800,
                textAlign: "center",
                color: "#000",
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "rgba(255, 173, 31, 0.2)",
              borderColor: "rgba(255, 173, 31, 0.2)",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#D9D9D9",
            },
          }}
        />
      )}
    />
  );
}
