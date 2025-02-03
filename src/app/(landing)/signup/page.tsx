// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box, Button, Typography, Link, Stack, Container } from "@mui/material";
import NextLink from "next/link";
import CustomizedSteppers from "@/app/components/stepper";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";

const MAX_STEPS = 2;

export default function SignupPages() {
  const [step, setStep] = React.useState(1);

  let userMessage = "";
  let showSignInMessage = true;
  let stepContent;

  const prevStep = () => {
    setStep(step === 1 ? MAX_STEPS : step - 1);
  };

  const nextStep = () => {
    setStep(step === MAX_STEPS ? 0 : step + 1);
  };

  switch (step) {
    case 1:
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <ChooseRole />;
      break;
    case 2:
      userMessage = "";
      showSignInMessage = false;
      stepContent = <ChooseService prevStep={prevStep} />;
      break;
    default:
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <ChooseRole />;
      break;
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          height: "48px",
        }}
      >
        {/* "Welcome to Carelybay", "Email sent", etc */}
        {userMessage && (
          <img
            src="https://placehold.co/24x24"
            alt="Message image"
            width={24}
            height={24}
          />
        )}
        <Typography>{userMessage}</Typography>
      </Box>
      {stepContent}
      <Button
        variant="primary"
        onClick={nextStep}
        sx={{ width: "200px", height: "48px", alignSelf: "end" }}
      >
        Continue
      </Button>
      <Box sx={{ marginTop: "auto" }}>
        {showSignInMessage && (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: 5 }}
          >
            Already using Carelybay?&nbsp;
            <Link component={NextLink} href="/signin">
              Sign in
            </Link>
          </Typography>
        )}
        <CustomizedSteppers activeStep={step} />
      </Box>
    </Container>
  );
}
