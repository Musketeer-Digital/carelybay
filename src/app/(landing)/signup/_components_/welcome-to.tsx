import React from "react";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  location: { id: number; name: string };
  travelDistanceKm: number;
}

export default function WelcomeTo() {
  const onSubmit: SubmitHandler<PersonalInformationInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CheckCircle width={92} height={92} />
      <Typography variant="h4">Welcome to Carelybay</Typography>
      <Typography variant="body1">
        We’re excited to have you on board. Your registration is complete, and
        you can now enhance your profile to attract potential clients.
      </Typography>
    </Box>
  );
}
